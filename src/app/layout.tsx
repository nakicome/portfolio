import "./globals.css";
import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "My Blog",
    description: "Next.js SSG Blog",
};

// App Routerでは全ページ共通の枠をこのコンポーネントで定義
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ja">
        <body className="min-h-dvh bg-white text-zinc-900 antialiased">
        <header className="border-b">
            <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
                <Link href="/" className="font-semibold">My Blog</Link>
                <nav className="text-sm">
                    <Link href="/blog" className="hover:underline">Blog</Link>
                </nav>
            </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
        <footer className="border-t mt-16">
            <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-zinc-500">
                © {new Date().getFullYear()} My Blog
            </div>
        </footer>
        </body>
        </html>
    );
}
