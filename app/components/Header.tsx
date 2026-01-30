"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../public/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "ফ্রেম তৈরি করুন", href: "/photo-frame" },
    { label: "ভবিষ্যৎ উদ্যোগ", href: "#upcoming", comingSoon: true },
    { label: "আমাদের লক্ষ্য", href: "#values" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <span className="text-xl md:text-2xl font-bold text-primary">
              সবার আগে বাংলাদেশ
            </span> */}

            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
                {item.comingSoon && (
                  <span className="absolute -top-1 -right-1 text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                    শীঘ্রই
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border shadow-lg animate-fade-in">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors flex items-center justify-between"
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                      শীঘ্রই
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
