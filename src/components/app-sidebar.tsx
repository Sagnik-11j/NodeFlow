"use client"

import * as React from "react"
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
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription"

const menuItems = [
    {
        title: "Main Services",
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
        ]
    },
    {
        title: "Activity",
        items: [
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

    // subscription hook
    const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

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

    // Reusable styling for navigation items
    const navItemClass = `
        h-10 rounded-sm px-3 font-medium transition-all duration-200 
        text-muted-foreground hover:bg-secondary hover:text-foreground 
        data-[active=true]:bg-background data-[active=true]:border data-[active=true]:border-border/60 data-[active=true]:shadow-xs data-[active=true]:text-emerald-600
    `;

    // Using variant="floating" handles the rounded app-like card layout natively
    return (
        <Sidebar variant="sidebar" collapsible="icon" className="border-none shadow-sm">
            {/* Header / Logo Section */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent p-1">
                            <Link prefetch href={"/workflows"}>
                                <div className="flex aspect-square size-9 items-center justify-center text-rose-500 rounded-sm border shadow-xs shrink-0">
                                    <Image
                                        src={"/logos/logo.png"}
                                        alt="nodeflow"
                                        width={22}
                                        height={22}
                                        className="shrink-0"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none ml-2 overflow-hidden">
                                    <span className="font-bold text-sm tracking-tight truncate text-foreground">
                                        Nodeflow
                                    </span>
                                    <span className="text-[11px] text-muted-foreground truncate">
                                        Workspace
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation Content */}
            <SidebarContent className="px-2 pt-2">
                {menuItems.map((group, index) => (
                    <React.Fragment key={group.title}>
                        <SidebarGroup className="p-0 mb-2">
                            <SidebarGroupLabel className="text-[11px] font-medium text-muted-foreground/70 px-3 mb-1">
                                {group.title}
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);

                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={isActive}
                                                    asChild
                                                    className={navItemClass}
                                                >
                                                    <Link href={item.url} prefetch>
                                                        <item.icon className={`size-4 shrink-0 ${isActive ? "text-emerald-600" : ""}`} />
                                                        <span className="truncate">{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {index < menuItems.length - 1 && (
                            <SidebarSeparator className="mx-auto my-2 w-[calc(100%-1rem)]" />
                        )}
                    </React.Fragment>
                ))}
            </SidebarContent>

            <SidebarSeparator className="mx-auto my-1 w-[calc(100%-2rem)]" />

            {/* Footer Section */}
            <SidebarFooter className="px-2 pb-4 pt-1">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-[11px] font-medium text-muted-foreground/70 px-3 mb-1">
                        Other
                    </SidebarGroupLabel>

                    <SidebarMenu className="space-y-1">
                        {!hasActiveSubscription && !isLoading && (
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={"Upgrade to Pro"}
                                    onClick={() => authClient.checkout({ slug: "pro" })}
                                    className={navItemClass}
                                >
                                    <StarIcon className="size-4 shrink-0 text-amber-500" />
                                    <span className="truncate">Upgrade to Pro</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        

                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip={"Billing Portal"}
                                onClick={() => authClient.customer.portal()}
                                className={navItemClass}
                            >
                                <CreditCardIcon className="size-4 shrink-0" />
                                <span className="truncate">Billing Portal</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip={"Sign Out"}
                                onClick={handleSignOut}
                                disabled={isLoggingOut}
                                className={navItemClass}
                            >
                                {isLoggingOut ? (
                                    <Loader2Icon className="size-4 shrink-0 animate-spin" />
                                ) : (
                                    <LogOutIcon className="size-4 shrink-0" />
                                )}
                                <span className="truncate">
                                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar