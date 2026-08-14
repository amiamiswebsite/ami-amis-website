"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "../../src/lib/assetPath";

function pageFromPathname(pathname, fallbackPage) {
  if (pathname?.includes("/diensten")) {
    return "services";
  }

  if (pathname?.includes("/team")) {
    return "team";
  }

  if (pathname?.includes("/contact")) {
    return "contact";
  }

  if (pathname?.includes("/work")) {
    return "work";
  }

  if (pathname?.includes("/home-2")) {
    return "home2";
  }

  return fallbackPage;
}

function activeKeyFromLocation(pathname, hash, fallbackPage) {
  if (pathname?.includes("/diensten")) {
    return "services";
  }

  if (pathname?.includes("/team")) {
    return "team";
  }

  if (pathname?.includes("/contact")) {
    return "contact";
  }

  if (pathname?.includes("/work")) {
    return "work";
  }

  if (pathname?.includes("/home-2")) {
    return "home2";
  }

  if (hash === "#werk") {
    return "work";
  }

  if (hash === "#diensten") {
    return "services";
  }

  if (fallbackPage === "team") {
    return "team";
  }

  return fallbackPage === "home2" ? "home2" : "home";
}

function getItems(activePage, activeKey) {
  return [
    {
      label: "Welkom",
      href: activePage === "home" ? "#intro" : `${assetPath("/")}#intro`,
      active: activeKey === "home",
    },
    {
      label: "Home 2",
      href: activePage === "home2" ? "#intro" : `${assetPath("/home-2/")}#intro`,
      active: activeKey === "home2",
    },
    {
      label: "over Ami Amis",
      href: activePage === "team" ? "#team-intro" : assetPath("/team/"),
      active: activeKey === "team",
    },
    {
      label: "Ons werk",
      href: assetPath("/work/"),
      active: activeKey === "work",
    },
    {
      label: "Diensten",
      href: assetPath("/diensten/"),
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
