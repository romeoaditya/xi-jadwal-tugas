"use client";

import {
  AlarmClock,
  ListCheck,
  NotebookPen,
  Menu,
  X,
  BrushCleaning,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

// Links data
const navigationLinks = [
  {href: "/", label: "Jadwal Mapel", icon: AlarmClock},
  {href: "/piket", label: "Jadwal Piket", icon: BrushCleaning},
  {href: "/tugas", label: "Tugas", icon: ListCheck},
  {href: "/catatan", label: "Catatan", icon: NotebookPen},
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-primary hover:text-primary/90">
            <Image
              src="/images/logo_rpl_2.png"
              alt="Logo RPL"
              width={48}
              height={48}
              style={{objectFit: "contain"}}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className={`flex-row items-center gap-2 py-1.5 px-3 font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="md:hidden mt-2 flex flex-col space-y-2 pb-4"
          >
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
