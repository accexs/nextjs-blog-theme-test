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

const LandingPage: React.FC = () => {
    const posts: Post[] = getPosts();
    const globalData: GlobalData = getGlobalData();

    return (
        <div>
            <main className="w-full">
                <h1 className="mb-12 text-3xl text-center lg:text-5xl">
                    {globalData.blogTitle}
                </h1>
                <p className="mb-4 text-xl text-center">
                    Welcome to my corner of the web where I write about software
                    development best practices and modern web technologies.
                </p>
                <p className="text-center">
                    Follow along for tutorials on TypeScript, Next.js and tips
                    for building robust applications.
                </p>
                <p className="mt-4 text-center">
                    I&apos;ve built multi-region infrastructure and distributed systems
                    focusing on high availability and strong consistency across
                    global deployments.
                </p>
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

export default LandingPage;