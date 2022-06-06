import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Talk from "./Talk";
import { useSelector } from "react-redux";

const Talks = ({ filter }) => {
  const loginedUserId = useSelector((state) => state?.user?.userInfo?.id);

  const { data, status, error } = useQuery("getPosts", () => {
    return axios.get("/api/post/getPosts").then((res) => {
      return res.data.data.posts;
    });
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error...</h1>;
  }

  return (
    <>
      {filter &&
        data
          .filter((post) => {
            return post.user_id === loginedUserId;
          })
          .map((post) => {
            return <Talk key={post.post_uuid} uuid={post.post_uuid} />;
          })}
      {!filter &&
        data.map((post) => {
          return <Talk key={post.post_uuid} uuid={post.post_uuid} />;
        })}
    </>
  );
};

export default Talks;
