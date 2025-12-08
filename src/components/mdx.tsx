"use client";
import {useMDXComponent} from "next-contentlayer2/hooks";

type Props = {
    code: string;
};

export function Mdx({code}: Props) {
    const Component = useMDXComponent(code);
    return (
        <div className="mdx">
            {/* eslint-disable-next-line react-hooks/static-components */}
            <Component/>
        </div>
    );
}
