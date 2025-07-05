import Link from 'next/link';
import {getPosts} from '@/utils/mdxUtils';
import {GradientBackground} from '@/components/GradientBackground';
import ArrowIcon from '@/components/ArrowIcon';
import {getGlobalData} from '@/utils/globalData';
import React from "react";

type Post = {
    content: string;
    data: {
        [key: string]: any;
    };
    filePath: string;
};

type GlobalData = {
    name: string;
    blogTitle: string;
    footerText: string;
};

export const generateMetadata = async () => {
    const globalData = getGlobalData();
    return {
        title: globalData.name,
        description: globalData.blogTitle,
    };
};

const PostsPage: React.FC = () => {
    const posts: Post[] = getPosts();
    const globalData: GlobalData = getGlobalData();

    return (
        <div>
            <main className="w-full">
                <h1 className="mb-12 text-3xl text-center lg:text-5xl">
                    {globalData.blogTitle}
                </h1>
                <ul className="w-full">
                    {posts.map((post) => (
                        <li
                            key={post.filePath}
                            className="transition border border-b-0 bg-white/10 border-gray-800/10 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 last:border-b"
                            data-sb-object-id={`data/posts/${post.filePath}`}
                        >
                            <Link
                                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/posts/[slug]`}
                                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-hidden focus:ring-4 focus:ring-primary/50"
                            >
                                {post.data.date && (
                                    <p
                                        className="mb-3 font-bold uppercase opacity-60"
                                        data-sb-field-path="date"
                                    >
                                        {post.data.date}
                                    </p>
                                )}
                                <h2 className="text-2xl md:text-3xl" data-sb-field-path="title">
                                    {post.data.title}
                                </h2>
                                {post.data.description && (
                                    <p
                                        className="mt-3 text-lg opacity-60"
                                        data-sb-field-path="description"
                                    >
                                        {post.data.description}
                                    </p>
                                )}
                                <ArrowIcon className="mt-4"/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
            <GradientBackground
                variant="large"
                className="fixed top-20 opacity-40 dark:opacity-60"
            />
            <GradientBackground
                variant="small"
                className="absolute bottom-0 opacity-20 dark:opacity-10"
            />
        </div>
    );
};

export default PostsPage;