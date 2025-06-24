import Image, { ImageProps } from 'next/image';

type CustomImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: ImageProps['src'];
  alt?: string;
};

const CustomImage = ({ src, alt, ...otherProps }: CustomImageProps) => (
  <figure className="aspect-4/3 relative">
    <Image
      className="object-cover object-top"
      src={src}
      alt={alt || ''}
      fill
      {...otherProps}
    />
  </figure>
);

export default CustomImage;
