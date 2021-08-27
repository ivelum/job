import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `,
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
