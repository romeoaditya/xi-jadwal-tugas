"use client";
import {AlarmClock, HouseIcon, ListCheck, NotebookPen} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  {href: "/", label: "Jadwal", icon: AlarmClock, active: true},
  {href: "/tugas", label: "Tugas", icon: ListCheck},
  {href: "/catatan", label: "Catatan", icon: NotebookPen},
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-primary hover:text-primary/90">
              {/* <Logo /> */}
              <Image
                src="/images/logo_tm.png"
                alt="Logo TM"
                width={500}
                height={500}
                style={{width: "48px", height: "48px", objectFit: "contain"}}
              />
            </Link>
          </div>
        </div>
        {/* Middle area */}
        <NavigationMenu>
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
                    <Icon
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2"></div>
      </div>
    </header>
  );
}
