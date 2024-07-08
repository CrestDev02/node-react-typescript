import { FC, useState } from "react";
import "./home-style.css"
import {Navbar} from "../navbar/navbar";
import { useLocation } from "react-router-dom";
import { Context } from "../../utils/context";

export const Home: FC = () => {

  return (
    <div>
      <div className="back-ground"></div>
      <div className="home-container">
       <Navbar />
        <div className="tagline">
        <p>Talent wins games, but teamwork <br />and intelligence win championships. </p>
        </div>
      </div>
      </div>
  );
};
