import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading: isLoadingCart, error: errorCart, data: cartData } = useQuery(
    ["cart", currentUser?._id],
    async () => {
      const response = await newRequest.get(`/cart/${currentUser._id}`);
      return response.data;
    }
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      document.cookie = null;
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrdersLink = () => {
    // Check if currentUser is available and has _id attribute
    if (currentUser?._id) {
      navigate(`/orders/${currentUser._id}`);
    } else {
      // Redirect to login page if currentUser is not available or doesn't have _id
      navigate("/login");
    }
  };

  const handlecartLink = () => {
    if (currentUser?._id) {
      navigate(`/cart/${currentUser._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <a href="/" className="image-link">
            <img
              src="./img/zalogo.png"
              alt="Link Image"
              className="left-image"
            />
          </a>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <span className="text">Home</span>
          </Link>
          <Link className="link" to="/services">
            <span className="text">Services</span>
          </Link>
          <Link className="link" to="/careers">
            <span className="text">Careers</span>
          </Link>
          <Link className="link" to="/training">
            <span className="text">Training</span>
          </Link>
          <Link className="link" to="/gigs">
            <span className="text">Products</span>
          </Link>
          {!currentUser?.isSeller && <span>Hello Buyer</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              {userImage ? (
                <img src={userImage} alt="" />
              ) : (
                <img src="../img/noavatar.jpeg" alt="" />
              )}
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Products
                      </Link>
                      <Link className="link" to="/add">
                        Add New Product
                      </Link>
                    </>
                  )}
                  {!currentUser.isSeller && (
                    <>
                      <span className="link" onClick={handlecartLink}>
                        Cart
                      </span>
                    </>
                  )}
                  <span className="link" onClick={handleOrdersLink}>
                    Orders
                  </span>
                  {/* <Link className="link" to="/messages">Messages</Link> */}
                  <span className="link" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
