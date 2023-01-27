import dynamic from "next/dynamic";
import CMSPostView from "../../components/cms-post-view";

const CMSLayout = dynamic(() => import("../../components/CMSLayout"), { ssr: false });

const CMSMainPage = (props) => {
  // const { categories } = props;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // dispatch(setCa)
  // }, []);

  return <CMSLayout>
    <CMSPostView />
  </CMSLayout>
}

export default CMSMainPage;