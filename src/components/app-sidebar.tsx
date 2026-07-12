"use client"

import { useState } from "react"
import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon, Loader2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

const menuItems = [
    {
        title: "main",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            },
        ]
    }
]

const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleSignOut = async () => {
        setIsLoggingOut(true);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
                onError: () => {
                    setIsLoggingOut(false);
                }
            },
        });
    };

    return (
        <Sidebar collapsible="icon" className="border-r-border/50">
            {/* Header / Logo Section */}
            <SidebarHeader className="pt-4 pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link prefetch href={"/workflows"}>
                                <div className="flex aspect-square size-8 items-center justify-center">
                                    <Image
                                        src={"/logos/logo.png"}
                                        alt="nodeflow"
                                        width={24}
                                        height={24}
                                        className="shrink-0"
                                    />
                                </div>
                                <span className="font-semibold text-base tracking-tight truncate">
                                    Nodeflow
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation Content */}
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)}
                                            asChild
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Link href={item.url} prefetch>
                                                <item.icon className="size-4" />
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Footer Section */}
            <SidebarFooter className="pb-4">
                <SidebarMenu className="space-y-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Upgrade to Pro"}
                            onClick={() => { }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <StarIcon className="size-4 text-amber-500" />
                            <span className="font-medium">Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Billing Portal"}
                            onClick={() => { }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <CreditCardIcon className="size-4" />
                            <span className="font-medium">Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={"Sign Out"}
                            onClick={handleSignOut}
                            disabled={isLoggingOut}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {isLoggingOut ? (
                                <Loader2Icon className="size-4 animate-spin" />
                            ) : (
                                <LogOutIcon className="size-4" />
                            )}
                            <span className="font-medium">
                                {isLoggingOut ? "Signing Out..." : "Sign Out"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar