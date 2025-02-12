"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import type { Header, User } from "@/payload-types";

// import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useHeaderTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface HeaderClientProps {
  data: Header;
  user: Pick<User, "name" | "id"> | null;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, user }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={cn("container relative z-20", headerTheme)}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            src={headerTheme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
          />
        </Link>
        <HeaderNav data={data} />
        <MobileNav data={data} />
        <div className="flex gap-3 items-center">
          <Button asChild size="sm">
            {user ? (
              <Link href="/dashboard" className="flex gap-1 items-center">
                <div className="rounded-full border-2 p-0.5">
                  <UserIcon className="w-4 h-4" />
                </div>
                {` ${user?.name}`}
              </Link>
            ) : (
              <Link href="/sign-in">Login</Link>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
