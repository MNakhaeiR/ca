import type React from "react"
import { AppToolbar } from "@/components/app-toolbar"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AppToolbar />
            {children}
        </>
    )
}
