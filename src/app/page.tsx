import BlogHeader from "@/components/blog-header"
import BlogList from "@/components/blog-list"

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <BlogHeader/>
            <main className="mx-auto max-w-5xl px-6 py-16 md:px-8 lg:px-12">
                <BlogList/>
            </main>
        </div>
    )
}
