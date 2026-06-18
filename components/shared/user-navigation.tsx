"use client";

import { userMenus } from "@/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Session } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { IconLogout } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserNavigation = ({ user }: { user: Session["user"] | null }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You’ve logged out. See you soon!");
            router.push("/signin");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("cursor-pointer rounded-full", {
          hidden: !user,
        })}
      >
        <Avatar className="border-border h-10 w-10 rounded-full border bg-white p-1">
          <AvatarImage
            src={
              `${process.env.NEXT_PUBLIC_S3_IMAGE_PATH}/${user?.image}` ||
              "/user.svg"
            }
            alt={user?.name}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="py-4">
          <h2 className="text-foreground truncate text-base">{user?.name}</h2>
          <p className="truncate text-sm">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenus.map((menu, idx) => (
          <DropdownMenuItem
            asChild
            key={idx}
            className={cn("cursor-pointer", {
              hidden: !menu.role.includes(user?.role ?? ""),
            })}
          >
            <Link href={menu.url}>
              <menu.Icon />
              <span>{menu.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        {userMenus.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={isPending}
        >
          <IconLogout />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
