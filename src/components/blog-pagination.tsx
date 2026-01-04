"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="前のページ"
            >
                <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`flex size-10 items-center justify-center rounded-sm text-sm font-medium transition-colors ${currentPage === page ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-secondary"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="次のページ"
            >
                <ChevronRight className="size-4" />
            </button>
        </div>
    )
}
