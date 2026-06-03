"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "../../src/lib/assetPath";

function homeHash(hash, activePage) {
  return activePage === "home" ? hash : `${assetPath("/")}${hash}`;
}

function pageFromPathname(pathname, fallbackPage) {
  if (pathname?.includes("/team")) {
    return "team";
  }

  if (pathname?.includes("/contact")) {
    return "contact";
  }

  if (pathname?.includes("/work")) {
    return "work";
  }

  return fallbackPage;
}

function activeKeyFromLocation(pathname, hash, fallbackPage) {
  if (pathname?.includes("/team")) {
    return "team";
  }

  if (pathname?.includes("/contact")) {
    return "contact";
  }

  if (pathname?.includes("/work")) {
    return "work";
  }

  if (hash === "#werk") {
    return "work";
  }

  if (hash === "#diensten") {
    return "services";
  }

  return fallbackPage === "team" ? "team" : "home";
}

function getItems(activePage, activeKey) {
  return [
    {
      label: "Welkom",
      href: homeHash("#intro", activePage),
      active: activeKey === "home",
    },
    {
      label: "Ami-team",
      href: activePage === "team" ? "#team-intro" : assetPath("/team/"),
      active: activeKey === "team",
    },
    {
      label: "Ons werk",
      href: homeHash("#werk", activePage),
      active: activeKey === "work",
    },
    {
      label: "Diensten",
      href: homeHash("#diensten", activePage),
      active: activeKey === "services",
    },
    {
      label: "Contact",
      href: assetPath("/contact/"),
      active: activeKey === "contact",
      blue: true,
    },
  ];
}

export default function NavOverlay({ open, onClose, activePage = "home" }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const currentPage = useMemo(
    () => pageFromPathname(pathname, activePage),
    [activePage, pathname],
  );
  const activeKey = useMemo(
    () => activeKeyFromLocation(pathname, hash, currentPage),
    [currentPage, hash, pathname],
  );
  const items = getItems(currentPage, activeKey);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  return (
    <div className={`nav-overlay ${open ? "is-open mobile-menu-overlay" : ""}`} aria-hidden={!open}>
      <nav className="nav-overlay__menu" aria-label="Hoofdnavigatie">
        {items.map((item) => (
          <a
            aria-current={item.active ? "page" : undefined}
            className={`nav-overlay__link ${item.active ? "is-active active-menu-item" : ""} ${
              item.blue ? "is-blue" : ""
            }`}
            href={item.href}
            key={item.label}
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
