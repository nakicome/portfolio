import {defineDocumentType, makeSource} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug"; // 見出しにid付与（目次やリンクに便利）

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `posts/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {type: "string", required: true},
        date: {type: "date", required: true},
        description: {type: "string", required: false},
        tags: {type: "list", of: {type: "string"}, required: false},
        draft: {type: "boolean", required: false, default: false},
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, ""),
        },
        url: {
            type: "string",
            resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^posts\//, "")}`,
        },
    },
}));

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Post],
    mdx: {
        rehypePlugins: [rehypeSlug],
    },
});
