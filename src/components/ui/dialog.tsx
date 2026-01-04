"use client"

import * as React from "react"

export interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    return (
        <div aria-hidden={!open} className={open ? "" : "hidden"}>
            <div onClick={() => onOpenChange(false)} className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {children}
            </div>
        </div>
    )
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
    if (asChild) {
        return React.cloneElement(children, {
            onClick: (e: React.MouseEvent) => {
                children.props.onClick?.(e)
            },
            "data-dialog-trigger": true,
        })
    }
    return <button data-dialog-trigger>{children}</button>
}

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-md bg-background p-6 shadow-xl ${className}`.trim()} role="dialog">
            {children}
        </div>
    )
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="mb-4 border-b pb-2">{children}</div>
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <h2 className={`text-lg font-semibold ${className}`.trim()}>{children}</h2>
}
