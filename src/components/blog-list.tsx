"use client"

import {ChangeEvent, useState} from "react"
import {Input} from "@/components/ui/input"
import {Search} from "lucide-react"
import BlogCard from "@/components/blog-card"
import BlogPagination from "@/components/blog-pagination"
import TagFilter from "@/components/tag-filter"

// サンプルデータ
const POSTS = [
    {
        id: 1,
        title: "Next.js 16の新機能について",
        date: "2025-03-15",
        description: "Next.js 16で導入された新しいキャッシュAPIとReact 19.2の機能について詳しく解説します。",
        tags: ["Next.js", "React", "Web開発"],
    },
    {
        id: 2,
        title: "TailwindCSS v4へのマイグレーションガイド",
        date: "2025-03-10",
        description: "TailwindCSS v4への移行手順と新機能の活用方法を実例を交えて紹介します。",
        tags: ["TailwindCSS", "CSS", "Web開発"],
    },
    {
        id: 3,
        title: "TypeScriptの型安全性を高めるテクニック",
        date: "2025-03-05",
        description: "実践的なTypeScriptの型活用法と、より安全なコードを書くためのパターンを解説します。",
        tags: ["TypeScript", "プログラミング"],
    },
    {
        id: 4,
        title: "Supabaseで構築する認証システム",
        date: "2025-02-28",
        description: "SupabaseのAuth機能を使った安全な認証システムの実装方法を段階的に説明します。",
        tags: ["Supabase", "Database", "Web開発"],
    },
    {
        id: 5,
        title: "パフォーマンス最適化の実践的アプローチ",
        date: "2025-02-20",
        description: "Webアプリケーションのパフォーマンスを向上させるための具体的な手法とツールを紹介します。",
        tags: ["パフォーマンス", "Web開発"],
    },
    {
        id: 6,
        title: "デザインシステムの構築と運用",
        date: "2025-02-15",
        description: "スケーラブルなデザインシステムを作成し、チームで効果的に運用する方法を解説します。",
        tags: ["デザイン", "UI/UX"],
    },
]

const ALL_TAGS = Array.from(new Set(POSTS.flatMap((post) => post.tags)))

export default function BlogList() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5

    // フィルタリング
    const filteredPosts = POSTS.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))
        return matchesSearch && matchesTags
    })

    // ページネーション
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
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

                <TagFilter tags={ALL_TAGS} selectedTags={selectedTags} onTagToggle={handleTagToggle}/>
            </div>

            {/* 記事リスト */}
            <div className="space-y-12">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => <BlogCard key={post.id} post={post}/>)
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
