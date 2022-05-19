import { Fragment } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { env } from "process";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "./../../../components/navbar/Navbar";
import EventsViewer from "../../../components/eventsViewer/EventsViewer";
import ProblemSetTable from "../../../components/problemSet/ProblemSetTable";
import LoaderPage from "../../../components/loader/LoaderPage";

const ProblemsSection: React.FC = () => {
  const router = useRouter();
  const [problems, setProblems] = useState(null);
  const addProblem = () => {
    axios
      .post("/api/problems/new", {
        problem_id: 1024,
        title: "Triple",
        difficulty: 1,
        execution_time: 1,
        memory_limit: 256,
      } as any)
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    let filter = router.query.search;
    if(typeof filter === "string"){
        filter = filter.toLowerCase();
    }
    else if(typeof filter === "object"){
        filter = filter.join("").toLowerCase();
    }
    //filter has format q=<search>
    const search = filter ? filter.split("=")[1] : "";

    axios
        .get(`/api/problems/all`)
        .then((res) => {
            const data = res.data.list.filter((problem: any) => problem.title.toLowerCase().includes(search)) 
            
            setProblems(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);


  if (!problems) {
    return <LoaderPage />;
  }

  return (
    <Fragment>
      <Navbar />
      <main>
        <div className="grid-template gd-col-4">
          <div className="gd-span-3">
            <ProblemSetTable problems={problems} />
          </div>
          <EventsViewer />
        </div>
      </main>
    </Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   //Do get to get the data in API route problems
//   const res = await axios.get(`${env.PUBLIC_URL}/api/problems/all`);
//   const problems = res.data.list;
//   return { props: { problems } };
// };

export default ProblemsSection;
