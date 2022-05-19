import Code from "../../components/codeEditor/CodeEditor";
import ProblemViewer from "../../components/problemViewer/ProblemViewer";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      user_name
      name
      last_name
      email
    }
  }
`;

export default function Problem() {
  const { data, loading, error } = useQuery(ViewerQuery);
  const { viewer } = data || {};
  const shouldRedirect = !(loading || error || viewer);
  const router = useRouter();

  useEffect(() => {
    if(shouldRedirect){
        router.push("/login");
    }
    if (viewer) {
        console.log("viewer", viewer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  const id = router.query.id || "0";
  return (
    <div className="body">
      {router.query.id && <ProblemViewer id={parseInt(id)} />}
      <Code />
    </div>
  );
}
