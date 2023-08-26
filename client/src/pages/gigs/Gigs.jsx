import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import getImageFromBackend from "../../utils/getImageFromBackend";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs? ${search}${
            minRef.current.value !== undefined
              ? `&min=${minRef.current.value}`
              : ""
          }${
            maxRef.current.value !== undefined
              ? `&max=${maxRef.current.value}`
              : ""
          }&sort=${sort}`
          )
        .then((res) => {
          return res.data;
        }),
  });

  const renderGigs = () => {
    return isLoading
      ? "loading"
      : error
      ? "Something went wrong!"
      : data.map((gig) => (
          <GigCard key={gig._id} item={gig} />
        ));
  };
  
  

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
      
        <span className="breadcrumbs">Zeigler Aerospace {">"} Products {">"}</span>
        <h1>Everything you need is Here!!</h1>
        {/* <h1>You will Find everything</h1> */}
        <p>
        Explore the possibilities in a new way!
          {/* Explore the boundaries of Thrust like never before!! */}
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {renderGigs()}
        </div>
      </div>
    </div>
  );
}

export default Gigs;