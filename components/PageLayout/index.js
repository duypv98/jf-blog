import Footer from '../Footer';
import Header from '../Header';
import Layout from '../Layout';
import NavigationBar from '../NavigationBar';

/**
 *
 * @param {import("react").PropsWithChildren<{
 *  headerTitle?: string;
 *  headerSubTitle?: string;
 *  headerMeta?: string;
 *  headerBackground?: string;
 *  isSiteHeader?: boolean;
 *  pageId?: string;
 *  disableHeader?: boolean;
 * }>} props
 */

const PageLayout = (props) => {
  const {
    headerTitle,
    headerSubTitle,
    headerMeta,
    isSiteHeader,
    headerBackground,
    disableHeader,
    children
  } = props;
  return (
    <Layout>
      <NavigationBar bgcolor={disableHeader ? "#000000cc" : undefined} />
      {!disableHeader && <Header
        title={headerTitle}
        subTitle={headerSubTitle}
        meta={headerMeta ?? ''}
        isSiteHeader={isSiteHeader}
        backgroundSrc={headerBackground}
      />}
      <main {...(disableHeader ? { style: { paddingTop: "66.8px" } } : {})}>
        {children}
      </main>
      <Footer />
    </Layout>
  )
}

export default PageLayout;
