import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DonateModal from "./modals/DonateModal";
import { TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ReportModal from "./modals/ReportModal";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import Tag from "../utils/tag";
import PostDeleteModal from "./modals/PostDeleteModal";
import PostEditModal from "./modals/PostEditModal";
import LikeItModal from "./modals/LikeItModal";

function getTimeToString(inputTime) {
  let date = new Date(inputTime);

  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  yyyy = yyyy.toString();
  mm = mm.toString();
  dd = dd.toString();

  var m = date.getHours();
  var s = date.getMinutes();

  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  m = m.toString();
  s = s.toString();

  var s1 = `${yyyy}-${mm}-${dd} ${m}:${s}`;
  return s1;
}

const Talk = ({ uuid }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loginedUserId = useSelector((state) => state?.user?.userInfo?.id);

  const commentRef = useRef();
  const passwordRef = useRef();

  const newCommentMutation = useMutation(
    (comment) => {
      return axios.post("/api/comment/sendMemberComment", comment, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
    },
    {
      onSuccess: () => {
        alert("😄 The comment has been created successfully");
        commentRef.current.value = "";
      },
      onError: (error) => {
        alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
      },
    }
  );

  const newAnonyCommentMutation = useMutation(
    (comment) => {
      return axios.post("/api/comment/sendNonMemberComment", comment);
    },
    {
      onSuccess: () => {
        alert("😄 The comment has been created successfully");
        commentRef.current.value = "";
        passwordRef.current.value = "";
      },
      onError: (error) => {
        alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
      },
    }
  );

  // 🔥 useQuery Key.... unique하게 작성하는거...!!!
  const { data, status } = useQuery(`getPost_${uuid}`, () => {
    return axios.get(`/api/post/getPost?postUuid=${uuid}`).then((res) => {
      // console.log('🚨', res.data.data.post);
      return res.data.data.post;
    });
  });

  const { data: likeItCount } = useQuery(`getLikeCount_${uuid}`, () => {
    return axios.get(`/api/post/getLikeIt?postUuid=${uuid}`).then((res) => {
      return res.data.data.likeItCount;
    });
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error...</h1>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentRef.current.value.length === 0) {
      alert("❗️ Please fill the content field");
      return;
    }

    if (accessToken) {
      const comment = {
        content: commentRef.current.value,
        postUuid: uuid,
      };
      newCommentMutation.mutate(comment);
    } else {
      if (passwordRef.current.value === "") {
        alert("❗️ Please enter a password");
        return;
      } else {
        const anonymousComment = {
          content: commentRef.current.value,
          postUuid: uuid,
          anonymouseId: "anonymous user",
          password: passwordRef.current.value,
        };
        newAnonyCommentMutation.mutate(anonymousComment);
      }
    }
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#949494" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={data.user.imageUri}></Avatar>
            }
            title={data.user.id}
            subheader={getTimeToString(data.updatedAt)}
          />
          {/* 이 아래의 박스는 로그인한 유저의 id(from redux)와 post 작성자 id(data.user.id)가 같아아만 보인다. */}
          {loginedUserId === data.user.id && (
            <Box
              sx={{
                width: "80px",
                mr: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PostEditModal uuid={uuid} />
              <PostDeleteModal uuid={uuid} />
            </Box>
          )}
        </Box>
        <CardMedia component="img" image={data.imageUri} />
        <CardContent sx={{ pb: 0 }}>
          <Typography color="text.secondary" variant="h6">
            {data.content}
          </Typography>
          <Box sx={{ mt: 3 }}>
            {data.tag.map((tag, idx) => {
              return <Tag key={idx} keyword={tag} color={"default"} />;
            })}
          </Box>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ p: "14px", display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              width: "180px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LikeItModal uuid={uuid} postUserId={data.user.id} />
            <Typography>{likeItCount ? likeItCount : "0"}</Typography>
            <DonateModal postUserId={data.user.id} />
            <ReportModal uuid={uuid} postUserId={data.user.id} />
          </Box>
          <Box sx={{ display: "flex", flex: 1, ml: "30px" }}>
            <TextField
              label="Comment Message..."
              size="small"
              sx={{ mr: "10px", flex: accessToken ? 1 : 0.75 }}
              inputRef={commentRef}
            ></TextField>
            {accessToken === undefined && (
              <TextField
                type="password"
                label="Password"
                size="small"
                inputRef={passwordRef}
                sx={{ width: "100px", mr: "10px", flex: 0.25 }}
              ></TextField>
            )}
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Comment
            </Button>
          </Box>
        </CardActions>
      </Card>
      <Comments postUuid={uuid} />
    </>
  );
};

export default Talk;
