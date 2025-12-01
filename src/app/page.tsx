import {redirect} from "next/navigation";

export default function Home() {
    // ブログをメインページとするため、リダイレクト
    redirect("/blog");
}
