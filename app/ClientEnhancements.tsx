"use client";

import { useEffect } from "react";

export function ClientEnhancements() {
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const navigation = document.querySelector<HTMLElement>(".site-nav");
    const toggle = () => {
      const open = button?.getAttribute("aria-expanded") === "true";
      button?.setAttribute("aria-expanded", String(!open));
      navigation?.classList.toggle("open", !open);
    };
    button?.addEventListener("click", toggle);

    const close = () => {
      button?.setAttribute("aria-expanded", "false");
      navigation?.classList.remove("open");
    };
    const links = navigation?.querySelectorAll("a") ?? [];
    links.forEach((link) => link.addEventListener("click", close));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    const year = document.querySelector("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    return () => {
      button?.removeEventListener("click", toggle);
      links.forEach((link) => link.removeEventListener("click", close));
      observer.disconnect();
    };
  }, []);
  return null;
}
