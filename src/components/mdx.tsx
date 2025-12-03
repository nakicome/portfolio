"use client";

import {useMDXComponent} from "next-contentlayer/hooks";

type Props = {
    code: string;
};

export function Mdx({code}: Props) {
    const Component = useMDXComponent(code);
    return <Component/>;
}
