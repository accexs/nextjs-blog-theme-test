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
                Landing page.
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