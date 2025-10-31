import {notFound} from "next/navigation";
import {allPosts} from "contentlayer/generated";
import type {Metadata} from "next";

type Props = { params: { slug: string } };

export const dynamic = "error"; // SSGのみ

export function generateStaticParams() {
    return allPosts.map((post) => ({slug: post.slug}));
}

export function generateMetadata({params}: Props): Metadata {
    const post = allPosts.find((post) => post.slug === params.slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description ?? undefined,
        openGraph: {
            title: post.title,
            description: post.description ?? undefined,
            type: "article",
            url: post.url,
        },
    };
}

export default function PostPage({params}: Props) {
    const post = allPosts.find((post) => post.slug === params.slug);
    if (!post) notFound();

    return (
        <article className="prose prose-zinc max-w-none">
            <h1>{post.title}</h1>
            <p className="text-sm text-zinc-500">
                {new Date(post.date).toLocaleDateString("ja-JP")}
            </p>
            {/* Contentlayer の MDX は code（文字列）をそのまま出すのではなく、Componentを使う */}
            {/* ここではシンプルに dangerouslySetInnerHTML を避け、Contentlayer の compiled 一覧を使う */}
            {/* @ts-expect-error: contentlayer 型がcode持ちを許容 */}
            <post.body.component/>
        </article>
    );
}
