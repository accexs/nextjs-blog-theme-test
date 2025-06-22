import {getGlobalData} from "../../../utils/global-data";
import {getNextPostBySlug, getPostBySlug, getPostFilePaths, getPreviousPostBySlug} from "../../../utils/mdx-utils";
import CustomLink from "../../../components/CustomLink";
import CustomImage from "../../../components/CustomImage";
import {MDXRemote} from 'next-mdx-remote/rsc';
import Link from "next/link";
import ArrowIcon from "../../../components/ArrowIcon";
import Footer from "../../../components/Footer";
import Layout, {GradientBackground} from "../../../components/Layout";
import Header from "../../../components/Header";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";


export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const globalData = getGlobalData();
  const { mdxSource, data: frontMatter } = await getPostBySlug(slug);
  return {
    title: `${frontMatter.title} - ${globalData.name}`,
    description: frontMatter.description,
  };
};

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  img: CustomImage,
};

const PostPage = async ({ params }) => {
  const { slug } = await params;
  const globalData = getGlobalData();
  const { content, data } = await getPostBySlug(slug);
  const prevPost = getPreviousPostBySlug(slug);
  const nextPost = getNextPostBySlug(slug);
  return (
    <Layout>
      <Header name={globalData.name}/>
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
                    [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
                    rehypeUnwrapImages,
                  ],
                },
              }}
            />
          </article>
        </main>
        <div className="grid mt-12 md:grid-cols-2 lg:-mx-24">
          {prevPost && (
            <Link
              href={`/data/posts/${prevPost.slug}`}
              className="flex flex-col px-10 py-8 text-center transition border border-gray-800/10 bg-white/10 md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg last:rounded-b-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none"
            >
              <p className="mb-4 text-gray-500 uppercase dark:text-white dark:opacity-60">
                Previous
              </p>
              <h4 className="mb-6 text-2xl text-gray-700 dark:text-white">
                {prevPost.title}
              </h4>
              <ArrowIcon className="mx-auto mt-auto transform rotate-180 md:mr-0"/>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/data/posts/${nextPost.slug}`}
              className="flex flex-col px-10 py-8 text-center transition border border-t-0 border-b-0 border-gray-800/10 bg-white/10 md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10 first:border-t first:rounded-t-lg md:border-t last:border-b"
            >
              <p className="mb-4 text-gray-500 uppercase dark:text-white dark:opacity-60">
                Next
              </p>
              <h4 className="mb-6 text-2xl text-gray-700 dark:text-white">
                {nextPost.title}
              </h4>
              <ArrowIcon className="mx-auto mt-auto md:ml-0"/>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText}/>
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
};

export default PostPage;

export const generateStaticParams = async () =>
  getPostFilePaths()
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ slug }));
