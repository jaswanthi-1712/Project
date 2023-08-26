import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (input.trim() === "") {
      navigate(`/gigs`);
    } else {
      navigate(`/gigs?search=${input}`);
    }
  };
  return (
    <div className="featured">
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src="https://ziegler-aerospace.co.uk/wp-content/uploads/2020/03/How-An-Airplane-Works-720p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="container">
            <div className="left">
              <h1>
                Your Reliable Partner In Aircraft Engineering | Research | Parts Trading
              </h1>
              <div className="search">
                <div className="searchInput">
                  <img src="./img/search.png" alt="" />
                  <input type="text" placeholder='Search your product...' onChange={(e) => setInput(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>Search</button>
              </div>
              <div className="popular">
                <span>Popular:</span>
                <button>Wheels</button>
                <button>Aileron</button>
                <button>Propellers</button>
                <button>Rudders</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
