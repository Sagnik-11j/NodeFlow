"use server"

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
    const session = await auth.api.getSession(
        {
            headers: await headers(),
        }
    )

    if (!session) redirect("/login");

    return session
}

// if the user tries to visit the login page while being in session/authenticated
export const requireUnauth = async () => {
    const session = await auth.api.getSession(
        {
            headers: await headers(),
        }
    )

    if (session) redirect("/");
}