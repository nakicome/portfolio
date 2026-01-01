"use client"

import {ChangeEvent, useMemo, useState} from "react"
import {Input} from "@/components/ui/input"
import {Search} from "lucide-react"
import BlogCard, {BlogPost} from "@/components/blog-card"
import BlogPagination from "@/components/blog-pagination"
import TagFilter from "@/components/tag-filter"

interface BlogListProps {
    posts: BlogPost[]
}

export default function BlogList({posts}: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5

    const allTags = useMemo(() => {
        return Array.from(new Set(posts.flatMap((post) => post.tags ?? []))).filter(Boolean)
    }, [posts])

    const filteredPosts = useMemo(() => {
        const q = searchQuery.toLowerCase()
        return posts.filter((post) => {
            const title = post.title?.toLowerCase() ?? ""
            const description = post.description?.toLowerCase() ?? ""
            const tags = post.tags ?? []
            const matchesSearch = title.includes(q) || description.includes(q)
            const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => tags.includes(tag))
            return matchesSearch && matchesTags
        })
    }, [posts, searchQuery, selectedTags])

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1
    const startIndex = (currentPage - 1) * postsPerPage
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
        setCurrentPage(1)
    }

    return (
        <div className="space-y-16">
            {/* 検索とフィルタ */}
            <div className="space-y-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="記事を検索..."
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="h-12 pl-12 text-base"
                    />
                </div>

                <TagFilter tags={allTags} selectedTags={selectedTags} onTagToggle={handleTagToggle}/>
            </div>

            {/* 記事リスト */}
            <div className="space-y-12">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => <BlogCard key={post.slug} post={post}/>)
                ) : (
                    <div className="py-24 text-center">
                        <p className="text-muted-foreground">記事が見つかりませんでした</p>
                    </div>
                )}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
                <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            )}
        </div>
    )
}
