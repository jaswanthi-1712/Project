import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";


function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>We Are Ziegler Aerospace</h1>
            <p>
              Ziegler Aerospace is an ingenious Aerospace company offering a unique range of engineering services for airlines, MROs, and regulatory organisations. Our innovative solutions are tailored to meet the specific needs of our clients in the aerospace industry.
            </p>
            <p>
              At ZA Strength, we pride ourselves on our team of experts who possess extensive knowledge and experience in the aviation industry. Our team is fully equipped to provide a comprehensive range of services, including design and planning, production and installation, maintenance, repair, and certification of both minor and major (STC) aircraft modifications. Our expertise spans across a variety of areas, including interiors, avionics, and structures.
            </p>
          </div>
          <div className="item">
            <img src="./img/spacex.jpg" alt="" />
          </div>
        </div>
      </div>
      <div>
        <br></br>
      </div>
      <div className="features">
        <div className="container">
          <div className="item">
            <img src="./img/qa-02.jpeg.jpg" alt="" />
          </div>
          <div className="item">
            <h1>Competence With Purpose</h1>
            <p>
              With our Aircraft Design and Engineering capabilities, we solve complex aircraft modification and certification challenges for aircraft manufacturers, suppliers, airlines, and aviation authorities all over the world.
            </p>
            <p>
              Our Engineering Team implements a structured and multi-disciplinary systems engineering approach, determining upon extensive experience to provide high-tech technical and process integration solutions. Our ultimate objective is to achieve the best quality, lower life cycle costs, and shorter Time to Market while ensuring compliance with all regulatory aspects.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
