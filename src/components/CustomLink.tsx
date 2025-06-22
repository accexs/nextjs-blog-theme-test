import Link, { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = ({ as, href, ...otherProps }: CustomLinkProps) => (
  <Link as={as} href={href} {...otherProps} />
);

export default CustomLink;
