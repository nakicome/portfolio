// src/app/blog/page.tsx
type Post = {
    slug: string;
    title: string;
    date: string;
    description?: string;
};

const dummyPosts: Post[] = [
    {
        slug: "hello-world",
        title: "Hello World",
        date: "2025-10-20",
        description: "最初の投稿です。",
    },
    {
        slug: "second-post",
        title: "2つ目の記事",
        date: "2025-10-21",
        description: "ダミーデータその2。",
    },
];

export default function BlogIndex() {
    const posts = dummyPosts.sort(
        (a, b) => +new Date(b.date) - +new Date(a.date)
    );

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Blog</h1>
            <ul className="space-y-6">
                {posts.map((p) => (
                    <li key={p.slug} className="group">
                        {/* 本当は Link を使うけど、まずは表示だけ */}
                        <div className="block">
                            <h2 className="text-xl font-semibold group-hover:underline">
                                {p.title}
                            </h2>
                            <p className="text-sm text-zinc-500">
                                {new Date(p.date).toLocaleDateString("ja-JP")}
                            </p>
                            {p.description && (
                                <p className="mt-1 text-zinc-700">{p.description}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
