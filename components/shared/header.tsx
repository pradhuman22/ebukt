import React from "react";
import HeaderWrapper from "./header-wrapper";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/user";
import UserNavigation from "./user-navigation";
import { mainMenus } from "@/constant";

const Header = async () => {
  const { isLoggedIn, user } = await getCurrentUser();
  return (
    <HeaderWrapper>
      <div className="flex h-20 items-center justify-between gap-4 px-4">
        {/* logo section */}
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="ebukt"
            height={40}
            width={40}
            priority
            aria-label="ebukt"
            quality={75}
            className="-mt-1 h-9 w-9 object-contain md:-mt-1 md:h-8 md:w-8"
          />
        </Link>
        {/* navigation section */}
        <nav className="flex w-full max-w-[calc(50vw+435px)] items-center justify-between">
          {/* right navigation section */}
          <div>
            <ul
              className={cn("flex items-center gap-3 md:gap-6", {
                hidden: !isLoggedIn,
              })}
            >
              {mainMenus.map((menu, idx) => (
                <li key={idx}>
                  <Link
                    href={menu.path}
                    className="hover:text-primary flex items-center gap-1 text-lg font-normal"
                  >
                    <menu.Icon className="size-6 md:size-4" />
                    <span className="sr-only md:not-sr-only">{menu.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* left navigation section */}
          <div className="flex items-center">
            <Link
              href={"/create"}
              className={cn("hover:text-primary mr-6 text-lg font-normal", {
                hidden: !isLoggedIn,
              })}
            >
              Create Events
            </Link>
            <UserNavigation user={user} />
            <Link
              href={"/courses"}
              className={cn("hover:text-primary mr-6 text-lg font-normal", {
                hidden: isLoggedIn,
              })}
            >
              Discover Events
            </Link>
            <Button
              asChild
              className={cn("rounded-full px-3 text-lg font-normal", {
                hidden: isLoggedIn,
              })}
            >
              <Link href={"/signin"}>Sign In</Link>
            </Button>
          </div>
        </nav>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
