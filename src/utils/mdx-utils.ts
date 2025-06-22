import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeUnwrapImages from 'rehype-unwrap-images';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'data/posts');

// getPostFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getPostFilePaths = (): string[] =>
  fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((filePath) => /\.mdx?$/.test(filePath));

export const sortPostsByDate = <T extends { data: { date?: string } }>(
  posts: T[],
): T[] =>
  posts.sort((a, b) => {
    const aDate = new Date(a.data.date ?? '');
    const bDate = new Date(b.data.date ?? '');
    return bDate.getTime() - aDate.getTime();
  });

export interface Post {
  content: string;
  data: Record<string, any>;
  filePath: string;
}

export const getPosts = (): Post[] => {
  let posts: Post[] = getPostFilePaths().map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const {content, data} = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  posts = sortPostsByDate(posts);

  return posts;
};

export const getPostBySlug = async (
  slug: string,
): Promise<{
  mdxSource: MDXRemoteSerializeResult;
  data: Record<string, any>;
  postFilePath: string;
  content: string;
}> => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {content, data} = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, {
        theme: 'github-dark', // or 'nord', 'dracula', etc.
        keepBackground: false, // optional
      }], rehypeUnwrapImages],
    },
    scope: data,
  });

  return {mdxSource, data, postFilePath, content};
};

export const getNextPostBySlug = (
  slug: string,
): { title: string; slug: string } | null => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no next post found
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (
  slug: string,
): { title: string; slug: string } | null => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
