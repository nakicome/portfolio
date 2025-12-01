import {defineDocumentType, makeSource} from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `posts/**/*.mdx`,
    contentType: "mdx",
    // メタ情報の型定義
    fields: {
        title: {type: "string", required: true},
        date: {type: "date", required: true},
        description: {type: "string", required: false},
        tags: {type: "list", of: {type: "string"}, required: false},
        draft: {type: "boolean", required: false, default: false},
    },
    // ファイルパスからURL組み立て
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
});
