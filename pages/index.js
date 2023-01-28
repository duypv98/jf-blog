import PageLayout from '../components/PageLayout';
import useTrans from '../hooks/useTrans';

const Index = () => {
  const trans = useTrans();
  return (
    <PageLayout
      headerTitle={trans.index.title}
      headerSubTitle={trans.index.subTitle}
      isSiteHeader
    >
      <div id="index">
        Hello
      </div>
    </PageLayout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      x: 1
    }
  }
}

export default Index;
