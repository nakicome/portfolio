"use client"

import * as React from "react"

// Minimal input component with tailwind-friendly defaults
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
    {className = "", ...props},
    ref,
) {
    return (
        <input
            ref={ref}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
            {...props}
        />
    )
})

export {Input}
