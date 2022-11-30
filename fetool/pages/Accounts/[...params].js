import React from "react";
import { useRouter } from "next/router";
import BreadCrumbs from "../../src/components/BreadCrumbs";
import ProjectDetailHeader from "../../src/components/pageHeader/ProjectDetailHeader";

const projectName = () => {
  const router = useRouter();
  const { params = [] } = router.query;

  return (
    <>
      <BreadCrumbs pathofproject={params[1]} pathofclient={params[0]} />
      <ProjectDetailHeader />
    </>
  );
};

export default projectName;
