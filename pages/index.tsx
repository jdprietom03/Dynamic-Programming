import { Fragment } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

import Navbar from "./../components/navbar/Navbar";
import EventsViewer from "../components/eventsViewer/EventsViewer";
import TopicsMenu from "../components/topicsMenu/TopicsMenu";

import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoaderPage from "../components/loader/LoaderPage";


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

const SignOutMutation = gql`
  mutation SignOutMutation{
    signOut
  }
`;

const Home: React.FC<{ problems: any }> = ({ problems }) => {
  const { data, loading, error } = useQuery(ViewerQuery);
  const { viewer } = data || {};
  const shouldRedirect = !(loading || error || viewer);
  const client = useApolloClient()
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/login");
    }
    console.log(viewer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if(loading || !viewer) {
    return <LoaderPage />
  }

  const handleLogout = async () => {
    try{
      signOut().then(() => {
        client.resetStore().then(() => {
          router.push("/login");
        });
      });
    }catch(error){
      console.log(error);
    }
  }

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
        <div className="grid-template gd-col-3">
          <div className="home-container">
            <EventsViewer />
            <div className="welcome-container">
              <div className="profile-image-container">
                <div className="icon-profile"></div>
              </div>
              <br />
              <h1>Welcome, {viewer.name} {viewer.last_name}</h1>
              <p className="topics-description">
                You have solved 0 problems this week
              </p>
              <button className="btn-primary" onClick={handleLogout}>
                Log out
              </button>
            </div>
            <div className="news-container">
              <div className="gd-span-1">
                <div className="card">
                  <div className="card-header">
                    <span className="title">News</span>
                    <span className="subtitle">20/05/2022</span>
                  </div>
                  <div className="card-image"></div>
                  <div className="card-body">
                    <div className="description">
                      There is nothing new today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <TopicsMenu />
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
