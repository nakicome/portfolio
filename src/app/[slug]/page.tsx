import { notFound } from "next/navigation"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { Mdx } from "@/components/mdx"
import BlogHeader from "@/components/blog-header"

export async function generateStaticParams() {
    return allPosts
        .filter((post) => (process.env.NODE_ENV === "development" ? true : !post.draft))
        .map((post) => ({
            slug: post.slug,
        }))
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <BlogHeader />
            <main className="mx-auto max-w-3xl px-6 py-16 md:px-8 lg:px-12">
                <article className="space-y-8">
                    <header className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <Mdx code={post.body.code} />
                    </div>
                    <div className="pt-8">
                        <Link href="/" className="text-primary hover:underline">
                            ← 一覧に戻る
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    )
}
