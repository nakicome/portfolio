import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {allPosts} from "contentlayer/generated";
import {Mdx} from "@/components/mdx";

type PageProps = {
    params: Promise<{ slug: string }>;
};

// パラメータ一覧の作成
export function generateStaticParams() {
    return allPosts.map((p) => ({slug: p.slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {slug} = await params;
    const post = allPosts.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description ?? undefined,
    };
}

export default async function PostPage({params}: PageProps) {
    const {slug} = await params;
    const post = allPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    return (
        <article className="prose prose-zinc max-w-none">
            <h1>{post.title}</h1>
            <p className="text-sm text-zinc-500">
                {new Date(post.date).toLocaleDateString("ja-JP")}
            </p>
            <Mdx code={post.body.code}/>
        </article>
    );
}
