import Link from 'next/link';
import ArrowIcon from '@/components/ArrowIcon';

interface PostNavCardProps {
  slug: string;
  title: string;
  direction: 'next' | 'previous';
}

const PostNavCard = ({ slug, title, direction }: PostNavCardProps) => {
  const label = direction === 'next' ? 'Next' : 'Previous';
  const href = `/posts/${slug}`;
  const baseClasses =
    'flex flex-col px-10 py-8 text-center transition border border-gray-800/10 bg-white/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10';

  const prevClasses =
    'md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg last:rounded-b-lg last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none';

  const nextClasses =
    'border-t-0 border-b-0 md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg first:border-t md:border-t last:border-b';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${direction === 'previous' ? prevClasses : nextClasses}`}
    >
      <p className="mb-4 text-gray-500 uppercase dark:text-white dark:opacity-60">
        {label}
      </p>
      <h4 className="mb-6 text-2xl text-gray-700 dark:text-white">{title}</h4>
      <ArrowIcon
        className={`mx-auto mt-auto ${direction === 'previous' ? 'transform rotate-180 md:mr-0' : 'md:ml-0'}`}
      />
    </Link>
  );
};

export default PostNavCard;
