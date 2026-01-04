import BlogHeader from "@/components/blog-header"
import BlogList from "@/components/blog-list"
import { allPosts } from "contentlayer/generated"

export default function BlogPage() {
    const posts = allPosts
        .filter((p) => (process.env.NODE_ENV === "development" ? true : !p.draft))
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))

    return (
        <div className="min-h-screen bg-background">
            <BlogHeader />
            <main className="mx-auto max-w-5xl px-6 py-16 md:px-8 lg:px-12">
                <BlogList posts={posts} />
            </main>
        </div>
    )
}
