"use client"

import Link from "next/link"
import type {Post} from "contentlayer/generated"

export type BlogPost = Pick<Post, "slug" | "title" | "date" | "description" | "tags"> & {
    description?: string | null
    tags?: string[] | null
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
}

export default function BlogCard({post}: {post: BlogPost}) {
    const href = `/${post.slug}`
    const tags = post.tags ?? []
    return (
        <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    <Link href={href} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>
                <time className="text-sm text-muted-foreground">{formatDate(post.date)}</time>
            </div>
            {post.description && <p className="mt-3 text-muted-foreground">{post.description}</p>}
            {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    )
}
