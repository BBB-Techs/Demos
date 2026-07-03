"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { withBasePath } from "@/lib/basePath";

const links = [
  { href: "#capabilities", label: "What We Do" },
  { href: "#territory", label: "Territory" },
  { href: "#manufacturers", label: "Manufacturers" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="block shrink-0">
          <Image
            src={withBasePath("/logos/whb-logo.png")}
            alt="Wiggs-Haun & Bohan"
            width={789}
            height={671}
            priority
            unoptimized
            className={`h-10 w-auto transition-[filter] duration-300 md:h-12 ${
              scrolled ? "invert" : ""
            }`}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-blue-light ${
                scrolled ? "text-slate" : "text-paper/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="https://www.whbsales.com/employee-login"
            target="_blank"
            rel="noreferrer"
            className={`hidden text-sm font-medium transition-colors duration-300 hover:text-blue-light sm:inline ${
              scrolled ? "text-slate" : "text-paper/80"
            }`}
          >
            Employee Login
          </a>
          <a
            href="#contact"
            className="cursor-pointer rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-blue-light"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </motion.header>
  );
}
