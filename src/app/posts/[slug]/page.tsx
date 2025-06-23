import { MDXRemote } from 'next-mdx-remote/rsc';
import { GradientBackground } from '@/components/GradientBackground';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkGfm from 'remark-gfm';
import { getGlobalData } from '@/utils/globalData';
import {
  getPostFilePaths,
  getPostBySlug,
  getNextPostBySlug,
  getPreviousPostBySlug,
} from '@/utils/mdxUtils';
import CustomLink from '@/components/CustomLink';
import CustomImage from '@/components/CustomImage';
import PostNavCard from '@/components/PostNavCard';
import type { Metadata } from 'next';
import { JSX } from 'react';

type AsyncProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: AsyncProps): Promise<Metadata> => {
  const globalData = getGlobalData();
  const { slug } = await params;
  const { data } = await getPostBySlug(slug);
  return {
    title: `${data.title} - ${globalData.name}`,
    description: data.description,
  };
};

const components = {
  a: CustomLink,
  img: CustomImage,
};

const PostPage = async ({ params }: AsyncProps): Promise<JSX.Element> => {
  const { slug } = await params;
  const globalData = getGlobalData();
  const { content, data } = await getPostBySlug(slug);
  const prevPost = getPreviousPostBySlug(slug);
  const nextPost = getNextPostBySlug(slug);

  return (
    <div>
      <article className="px-6 md:px-0" data-sb-object-id={`posts/${slug}.mdx`}>
        <header>
          <h1
            className="mb-12 text-3xl text-center md:text-5xl dark:text-white"
            data-sb-field-path="title"
          >
            {data.title}
          </h1>
          {data.description && (
            <p className="mb-4 text-xl" data-sb-field-path="description">
              {data.description}
            </p>
          )}
        </header>
        <main>
          <article
            className="prose dark:prose-invert"
            data-sb-field-path="markdown_content"
          >
            <MDXRemote
              source={content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      { theme: 'github-dark', keepBackground: false },
                    ],
                    rehypeUnwrapImages,
                  ],
                },
              }}
            />
          </article>
        </main>

        <div className="grid mt-12 md:grid-cols-2 lg:-mx-24">
          {prevPost && (
            <PostNavCard
              slug={prevPost.slug}
              title={prevPost.title}
              direction="previous"
            />
          )}
          {nextPost && (
            <PostNavCard
              slug={nextPost.slug}
              title={nextPost.title}
              direction="next"
            />
          )}
        </div>
      </article>
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </div>
  );
};

export default PostPage;

export const generateStaticParams = async () => {
  return getPostFilePaths().map((path) => ({
    slug: path.replace(/\.mdx?$/, ''),
  }));
};
