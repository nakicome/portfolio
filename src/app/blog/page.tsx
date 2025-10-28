import Link from "next/link";
import {allPosts} from "contentlayer/generated";

export const dynamic = "error"; // SSGのみ（動的レンダ禁止）

export default function BlogIndex() {
    const posts = allPosts
        .filter(p => process.env.NODE_ENV === "development" ? true : !p.draft)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date));

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Blog</h1>
            <ul className="space-y-6">
                {posts.map((p) => (
                    <li key={p.slug} className="group">
                        <Link href={p.url} className="block">
                            <h2 className="text-xl font-semibold group-hover:underline">{p.title}</h2>
                            <p className="text-sm text-zinc-500">{new Date(p.date).toLocaleDateString("ja-JP")}</p>
                            {p.description && (
                                <p className="mt-1 text-zinc-700">{p.description}</p>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
