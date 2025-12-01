import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {allPosts} from "contentlayer/generated";
import {Mdx} from "@/components/mdx";

type Props = { params: { slug: string } };

// パラメータ一覧の作成
export function generateStaticParams() {
    return allPosts.map((p) => ({slug: p.slug}));
}

export function generateMetadata({params}: Props): Metadata {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description ?? undefined,
    };
}

export default function PostPage({params}: Props) {
    const post = allPosts.find((p) => p.slug === params.slug);
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
