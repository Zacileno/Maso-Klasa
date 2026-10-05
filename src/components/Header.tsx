"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ORDER_MAILTO, navItems } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = (href: string) => href === pathname;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-bar">
        <div className="header-bar__inner">
          <Link href="/" className="site-logo" onClick={closeMenu}>
            <Image
              src="/logo/logo-white.png"
              alt="Maso Klasa"
              width={5057}
              height={1215}
              priority
            />
          </Link>

          <nav className="main-nav" aria-label="Hlavní menu">
            <ul className="main-nav__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="main-nav__link"
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={ORDER_MAILTO} className="btn header-cta">
              Objednat teď
            </a>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-label="Mobilní menu"
      >
        <ul className="mobile-nav__list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="mobile-nav__link"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
