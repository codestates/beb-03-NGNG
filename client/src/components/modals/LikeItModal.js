import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "primary.light",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function LikeItModal({ uuid, postUserId }) {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loginUserId = useSelector((state) => state?.user?.userInfo?.id);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // 로그인 했는지 확인
    if (!accessToken) {
      alert("❗️ Please Log in");
      return;
    }
    if (postUserId === loginUserId) {
      alert("❗️ You cannot like your own post");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { likeItData } = useQuery("checkLikeIt", () => {
    return axios.get(`/api/post/getLikeIt?postUuid=${uuid}`).then((data) => {
      return data.data.data.likeItCount;
    });
  });

  const likeItMutation = useMutation(
    () => {
      return axios({
        method: "put",
        url: "/api/post/likeIt",
        data: {
          postUuid: uuid,
        },
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: (data) => {
        alert("😄 Your like has been sent successfully");
      },
      onError: (error) => {
        alert("❗️ You Lieked this post already");
      },
    }
  );

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    likeItMutation.mutate();
    handleClose();
  };

  return (
    <>
      <Tooltip title="Like it ❣️" placement="top">
        <IconButton aria-label="likeIt" onClick={handleOpen}>
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            🍭 Give a LIKE!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            If you give a "LIKE", the post author will be rewarded. Once you
            give "LIKE", this action will be undoable.
          </Typography>
          <Box noValidate sx={{ mt: 1, display: "flex" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 2 }}
              onClick={handleCancel}
            >
              CANCLE
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              YES
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
