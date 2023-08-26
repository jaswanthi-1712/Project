import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
//import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getImageFromBackend from "../../utils/getImageFromBackend";

function MyGigs() {

  const queryClient = useQueryClient();
  const [gigsWithImages, setGigsWithImages] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      // newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
      //   return res.data;
      // }),
      newRequest.get(`/gigs`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const fetchImagesForGigs = async () => {
      const gigsWithImages = await Promise.all(
        data.map(async (gig) => {
          const imageDataUrl = await getImageFromBackend(gig.cover);
          return { ...gig, imageDataUrl };
        })
      );
      setGigsWithImages(gigsWithImages);
    };

    if (data && data.length > 0) {
      fetchImagesForGigs();
    }
  }, [data]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (giguserId, _id) => {
    if (currentUser && giguserId) {
      if (currentUser._id === giguserId) {
        console.log("Deleting gig with ID:", giguserId);
        mutation.mutate(_id);
      } else {
        console.log("You can only delete your own products.");
      }
    }
  };

  console.log(data);

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Products</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New item</button>
              </Link>
            )}
          </div>
          <span>

          </span>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => {
                if (gig.userId === currentUser._id) { // Check if the gig's userId matches currentUser._id
                  return (
                    <tr key={gig._id}>
                      <td>{gig.title}</td>
                      <td>{gig.price}</td>
                      <td>{gig.sales}</td>
                      <td>
                        <img
                          className="delete"
                          src="./img/delete.png"
                          alt=""
                          onClick={() => handleDelete(gig.userId, gig._id)}
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Do not render the gig if the userId doesn't match
                }
              })}
            </tbody>
          </table>
        </div>

      )}
    </div>
  );
}

export default MyGigs;