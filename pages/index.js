import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import useTrans from '../hooks/useTrans';

const Index = () => {
  const trans = useTrans();
  return (
    <Layout>
      <NavigationBar />
      <Header
        title={trans.index.title}
        subTitle={trans.index.subTitle}
        isSiteHeader={true}
      />
      <div id="index">
        
      </div>
      <Footer />
    </Layout>
  );
}

export default Index;