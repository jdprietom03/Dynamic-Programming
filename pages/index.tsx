import { Fragment } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

import Navbar from "./../components/navbar/Navbar";
import EventsViewer from "../components/eventsViewer/EventsViewer";
import ProblemSetTable from "../components/problemSet/ProblemSetTable";

import { useQuery, gql } from "@apollo/client";
import { useEffect } from 'react'
import { useRouter } from 'next/router';

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

const Home: React.FC<{ problems: any }> = ({ problems }) => {

  const { data, loading, error } = useQuery(ViewerQuery);
  const { viewer } = data || {};
  const shouldRedirect = !(loading || error || viewer); 
  const router = useRouter();

  useEffect(() => {
    if(!viewer) {
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Do get to get the data in API route problems
  const res = await axios.get("http://localhost:3000/api/problems/all");
  const problems = res.data.list;
  return { props: { problems } };
};

export default Home;
