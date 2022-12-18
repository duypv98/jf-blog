import dynamic from "next/dynamic";

const CMSLayout = dynamic(() => import("../../components/CMSLayout"), { ssr: false });

const CMSMainPage = () => {
  return <CMSLayout>
    xxx
  </CMSLayout>
}

export default CMSMainPage;