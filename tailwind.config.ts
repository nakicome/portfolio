import type {Config} from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        ".contentlayer/**/*.{js,ts,jsx,tsx,md,mdx}",
    ],
    theme: {extend: {}},
    plugins: [typography],
};
export default config;
