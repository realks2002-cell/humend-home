"use client";

import Image from "next/image";

const navItems = [
  { index: 1, label: "회사소개" },
  { index: 2, label: "사업안내" },
  { index: 3, label: "문제해소" },
  { index: 4, label: "운영개선" },
];

export default function Header() {
  const scrollToSection = (index: number) => {
    const container = document.querySelector(".fullpage-container");
    if (!container) return;
    container.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
      <Image
        src="/logo-humend.png"
        alt="HUMAN:D"
        width={200}
        height={40}
        className="h-4 md:h-[25.6px] w-auto ml-0 md:ml-[40px]"
        priority
      />

      <nav className="hidden md:flex items-center gap-12 mr-[40px]">
        {navItems.map((item) => (
          <button
            key={item.index}
            onClick={() => scrollToSection(item.index)}
            className="text-white hover:text-white text-lg font-medium transition-colors bg-transparent border-none cursor-pointer"
          >
            {item.label}
          </button>
        ))}
        <a
          href="https://humendhr.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white text-lg font-medium transition-colors cursor-pointer"
        >
          채용공고
        </a>
        <button
          onClick={() => scrollToSection(5)}
          className="bg-primary hover:bg-primary/80 text-white text-base font-semibold rounded-full px-5 py-2 transition-colors cursor-pointer border-none"
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
}
