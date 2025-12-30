"use client"

import Link from "next/link"

export interface BlogPost {
    id: number
    title: string
    date: string
    description: string
    tags: string[]
}

export default function BlogCard({post}: {post: BlogPost}) {
    return (
        <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>
                <time className="text-sm text-muted-foreground">{post.date}</time>
            </div>
            <p className="mt-3 text-muted-foreground">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    )
}
