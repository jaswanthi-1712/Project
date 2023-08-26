import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getImageFromBackend from "../../utils/getImageFromBackend";

const GigCard = ({ item }) => {
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", item.userId],
    queryFn: () =>
      newRequest.get(`/user/${item.userId}`).then((res) => res.data),
  });

  useEffect(() => {
    fetchGigImage();
  }, []);
  
  const fetchGigImage = async () => {
    try {
      const imageDataUrl = await getImageFromBackend(item.cover);
      setImageDataUrl(imageDataUrl);
    } catch (err) {
      console.log("Error fetching gig image:", err);
    }
  };
  
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  const handleGigClick = () => {
    console.log("Clicked Gig:", item);
    navigate(`/gig`, { state: { gigItem: item } }); // Pass the gig item as state
  };

  return (
      <div className="gigCard" onClick={handleGigClick}>
        {imageDataUrl ? (
          <img src={imageDataUrl} alt="" />
        ) : (
          <div>Loading Image...</div>
        )}
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.StarNumber) &&
                Math.round(item.totalStars / item.StarNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
  );
};

export default GigCard;
