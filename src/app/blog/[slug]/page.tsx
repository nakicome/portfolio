import {notFound} from "next/navigation";
import {allPosts} from "contentlayer/generated";
import type {Metadata} from "next";

type Props = { params: { slug: string } };

export const dynamic = "error"; // SSGのみ

type PostEntry = (typeof allPosts)[number];
const posts = allPosts as PostEntry[];

export function generateStaticParams() {
    return posts.map((post) => ({slug: post.slug}));
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

    const Body = post.body.component;

    return (
        <article className="prose prose-zinc max-w-none">
            <h1>{post.title}</h1>
            <p className="text-sm text-zinc-500">
                {new Date(post.date).toLocaleDateString("ja-JP")}
            </p>
            <Body />
        </article>
    );
}
