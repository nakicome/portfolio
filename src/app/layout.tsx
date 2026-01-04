import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "技術とか日常とか",
};

// App Routerでは全ページ共通の枠をこのコンポーネントで定義
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <main>{children}</main>
        <footer className="border-t mt-16">
          <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-zinc-500 text-center">
            © {new Date().getFullYear()} nakicome
          </div>
        </footer>
      </body>
    </html>
  );
}
