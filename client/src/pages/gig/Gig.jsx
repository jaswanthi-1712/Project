import React, { useState, useEffect, useRef } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { useQuery, useMutation } from "@tanstack/react-query";
import getImageFromBackend from "../../utils/getImageFromBackend";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const gigItem = location.state?.gigItem;
  const [gigImages, setGigImages] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [userImageURL, setUserImageURL] = useState(null);
  const userImageURLRef = useRef(null);
  // console.log("Gig component - gigItem:", gigItem);

  // console.log(gigItem?._id);
  const { isLoading, error, data } = useQuery(["gig", gigItem?._id], () =>
    newRequest.get(`/gigs/single/${gigItem?._id}`).then((res) => res.data)
  );

  useEffect(() => {
    if (data?.images) {
      // Separate cover image and other images
      const coverImg = data.images.find((img) => img === data.cover);
      const otherImgs = data.images.filter((img) => img !== data.cover);
      setCoverImage(coverImg);
      fetchGigImages(otherImgs)
        .then((imageUrls) => {
          setGigImages(imageUrls);
        })
        .catch((error) => {
          console.error("Error fetching gig images:", error);
          setGigImages([]); // Set empty array in case of an error
        });
    }
  }, [data?.images, data?.cover]);

  // const userId = data.userId;
  // console.log(userId);

  const buyerId = JSON.parse(localStorage.getItem("currentUser"));
  console.log(buyerId, typeof buyerId);
  const createOrderMutation = useMutation(
    () => newRequest.post(`/orders/create-payment-intent/${gigItem._id}`, 
    {
      userId: buyerId["_id"],
    }),
    {
      onSuccess: () => {
        // Navigate to the orders page after successful order creation
        navigate(`/orders/${buyerId["_id"]}`);
      },
      onError: (error) => {
        navigate(`/orders/${buyerId["_id"]}`);
      },
    }
  );

  const createcartMutation = useMutation(
    () => newRequest.post(`/cart/create-cart-intent/${gigItem._id}`, 
    {
      userId: buyerId["_id"],
    }),
    {
      onSuccess: () => {
        // Navigate to the orders page after successful order creation
        navigate(`/cart/${buyerId["_id"]}`);
      },
      onError: (error) => {
        navigate(`/cart/${buyerId["_id"]}`);
      },
    }
  );

  const handleContinue = async () => {
    try {
      await createOrderMutation.mutateAsync();
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  const handlecart = async () => {
    try {
      await createcartMutation.mutateAsync();
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  // console.log(gigItem.userId, typeof gigItem.userId);
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery(["user", gigItem?.userId], () =>
  newRequest.get(`/user/${gigItem?.userId}`).then((res) => res.data)
);

const showContinueButton = buyerId && !buyerId["isSeller"];

//this is for the user image
const fetchImage = async (imageUrl) => {
  try {
    const imageBlob = await getImageFromBackend(imageUrl);
    const blob = new Blob([imageBlob.data], { type: imageBlob.headers["content-type"] });
    // Revoke the previous URL if it exists
    if (userImageURLRef.current) {
      URL.revokeObjectURL(userImageURLRef.current);
    }
    const url = URL.createObjectURL(blob);
    // Set the URL in both state and ref
    setUserImageURL(url);
    userImageURLRef.current = url;
  } catch (error) {
    console.error("Error fetching image:", error);
    setUserImageURL(null);
  }
};
useEffect(() => {
  if (dataUser?.img) {
    fetchImage(dataUser.img);
  }

  return () => {
    if (userImageURLRef.current) {
      URL.revokeObjectURL(userImageURLRef.current);
    }
  };
}, [dataUser?.img]);


  // this is to fetch gig images
  const fetchGigImages = async (images) => {
    try {
      if (!Array.isArray(images) || images.length === 0) {
        console.error("Invalid images data. Expected a non-empty array.");
        return [];
      }

      const imageUrls = await Promise.all(
        images.map(async (img) => await getImageFromBackend(img))
      );
      return imageUrls.filter((imageUrl) => imageUrl !== null);
    } catch (error) {
      console.error("Error fetching gig images:", error);
      return []; // Return an empty array in case of an error
    }
  };

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        " "
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Zeigler  Aerospace {">"} {data?.cat} {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              ""
            ) : errorUser ? (
              " "
            ) : (
              <div className="user">
                {userImageURL ? (
                  <img className="pp" src={userImageURL} alt="" />
                ) : (
                  <img className="pp" src="/img/noavatar.jpeg" alt="" />
                )}
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {/* Separate Slider for cover and other images */}
            <div className="slider">
              {coverImage && <img src={coverImage} alt="" />}
              {gigImages.length > 0 && (
                <Slider slidesToShow={1} arrowsScroll={1}>
                  {gigImages.map((img) => (
                    <img key={img} src={img} alt="" />
                  ))}
                </Slider>
              )}
            </div>
            <h2>About This Product</h2>
            <p>{data?.desc}</p>
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  {/* <img src={dataUser.img || "/img/noavatar.jpeg"} alt="" /> */}
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    {/* <button>Contact Me</button> */}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            {showContinueButton && ( <Reviews gigId={id} />)}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {showContinueButton && (
              <Link>
                <button onClick={handleContinue}>Click to pay</button>
              </Link>
            )}
            
            {showContinueButton && (
              <Link>
                <button onClick={handlecart}>Add to cart</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
