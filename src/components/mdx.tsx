"use client";
import { useMDXComponent } from "next-contentlayer2/hooks";

type Props = {
    code: string;
};

export function Mdx({ code }: Props) {
    if (!code) {
        return null;
    }
    const Component = useMDXComponent(code);
    return <Component />;
}
