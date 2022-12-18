import { useRouter } from "next/router";

const SeriesPage = (props) => {
  const { series } = props;

  return (<>SERIES</>)
}

/**
 *
 * @param {import("next").GetStaticPathsContext} context
 * @returns {import("next").GetStaticPathsResult}
 */
export const getStaticPaths = async (context) => {
  const series = ["fe", "be", "devops"];
  const paths = [];
  series.forEach((s) => {
    context.locales.forEach((locale) => {
      paths.push({ params: { series: s }, locale })
    })
  })
  return {
    fallback: false,
    paths
  };
}

/**
 *
 * @param {import("next").GetStaticPropsContext} context
 * @returns {import("next").GetStaticPropsResult}
 */
export const getStaticProps = async (context) => {
  return {
    props: {
    },
    revalidate: 3600
  }
}

export default SeriesPage;