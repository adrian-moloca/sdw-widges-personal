import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  keywords: string[];
  children?: React.ReactNode;
}

export const Seo = ({ title, description, keywords, children }: Props) => {
  const metaRobots = 'index, follow';
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {/* <meta name="google-site-verification" content="g" /> */}
      <meta name="robots" content={metaRobots} />
      <meta name="rating" content="General" />
      <meta property="og:type" content={'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:description" content={description} />
      <meta name="twitter:creator" content={'Olympic Channel Services - SDW'} />
      <meta name="twitter:card" content={'website'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {children}
    </Helmet>
  );
};
