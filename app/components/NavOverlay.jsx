"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "../../src/lib/assetPath";

function pageFromPathname(pathname, fallbackPage) {
  if (pathname?.includes("/assets")) {
    return "assets";
  }

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

  return fallbackPage;
}

function activeKeyFromLocation(pathname, hash, fallbackPage) {
  if (pathname?.includes("/assets")) {
    return "assets";
  }

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

  if (hash === "#werk") {
    return "work";
  }

  if (hash === "#diensten") {
    return "services";
  }

  if (fallbackPage === "team") {
    return "team";
  }

  return "home";
}

function getItems(activePage, activeKey) {
  return [
    {
      label: "Welkom",
      href: assetPath("/"),
      active: activeKey === "home",
    },
    {
      label: "Over Ami Amis",
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
      label: "Assets",
      href: assetPath("/assets/"),
      active: activeKey === "assets",
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
  const overlayRef = useRef(null);
  const restoreFocusRef = useRef(null);
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

    const overlay = overlayRef.current;
    const siteShell = document.querySelector(".site-shell");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    restoreFocusRef.current = document.activeElement;
    if (siteShell) siteShell.inert = true;
    window.requestAnimationFrame(() => overlay?.querySelector(focusableSelector)?.focus());

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !overlay) return;
      const focusable = [...overlay.querySelectorAll(focusableSelector)].filter(
        (element) => !element.hasAttribute("hidden") && element.getClientRects().length > 0,
      );
      if (!focusable.length) {
        event.preventDefault();
        overlay.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      if (siteShell) siteShell.inert = false;
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose, open]);

  return (
    <div
      aria-hidden={!open}
      aria-label="Hoofdnavigatie"
      aria-modal={open ? "true" : undefined}
      className={`nav-overlay ${open ? "is-open mobile-menu-overlay" : ""}`}
      id="site-navigation"
      inert={!open ? true : undefined}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      ref={overlayRef}
      role={open ? "dialog" : undefined}
      tabIndex={-1}
    >
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
