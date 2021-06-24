import Layout from '../Layout';
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import Footer from '../Footer';

/**
 *
 * @param {import("react").PropsWithChildren<{
 *  headerTitle?: string;
 *  headerSubTitle?: string;
 *  headerMeta?: string;
 *  headerBackground?: string;
 *  isSiteHeader?: boolean;
 *  pageId?: string;
 * }>} props
 */

const PageLayout = (props) => {
  const {
    headerTitle,
    headerSubTitle,
    headerMeta,
    isSiteHeader,
    headerBackground,
    children
  } = props;
  return (
    <Layout>
      <NavigationBar />
      <Header
        title={headerTitle}
        subTitle={headerSubTitle}
        meta={headerMeta ?? ''}
        isSiteHeader={isSiteHeader}
        backgroundSrc={headerBackground}
      />
      {children}
      <Footer />
    </Layout>
  )
}

export default PageLayout;
