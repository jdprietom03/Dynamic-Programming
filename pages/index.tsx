import { Fragment } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

import Navbar from "./../components/navbar/Navbar";
import EventsViewer from "../components/eventsViewer/EventsViewer";

function Home() {

  return (
    <Fragment>
      <Navbar active="home"/>
      <main>
        <div className="grid-template gd-col-3">
          <EventsViewer />
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
