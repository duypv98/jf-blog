import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCategories } from "../../app/cms-slices/cms-category.slice";
import categoryServices from "../../backend/services/category";
import CMSCategoryView from "../../components/cms-category-view";

const CMSLayout = dynamic(() => import("../../components/CMSLayout"), { ssr: false });

const CMSCategoryPage = (props) => {
  const { categories } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories(categories));
  }, []);

  return <CMSLayout>
    <CMSCategoryView />
  </CMSLayout>
}

export const getServerSideProps = async () => {
  const categories = await categoryServices.getAll();
  return {
    props: {
      categories
    }
  }
}

export default CMSCategoryPage;