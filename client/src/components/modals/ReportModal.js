import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import BugReportIcon from "@mui/icons-material/BugReport";
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

export default function ReportModal({ uuid, postUserId }) {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loginUserId = useSelector((state) => state?.user?.userInfo?.id);
  const contentRef = useRef();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // 로그인 했는지 확인
    if (!accessToken) {
      alert("❗️ Please Log in");
      return;
    }
    if (postUserId === loginUserId) {
      alert("❗️ You cannot report your own post");
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const reportMutation = useMutation(
    (content) => {
      return axios({
        method: "post",
        url: "/api/report/reportPost",
        data: {
          postUuid: uuid,
          content: content,
        },
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: (data) => {
        alert("😄 Your report has been successfully sent");
      },
      onError: (error) => {
        alert("❗️ You reported this post already");
      },
    }
  );

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사유 작성했는지 확인하기

    if (contentRef.current.value === "") {
      alert("❗️ Please fill the reason field");
      return;
    }

    reportMutation.mutate(contentRef.current.value);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Report this post 🚨" placement="top">
        <IconButton
          aria-label="report"
          sx={{ color: "#B05505" }}
          onClick={handleOpen}
        >
          <BugReportIcon />
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
            🚨 Report to Manager
          </Typography>
          <Typography>Please write the reason for the report.</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Write the reason.."
            name="email"
            autoComplete="email"
            autoFocus
            multiline
            rows={3}
            inputRef={contentRef}
          />
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
              DONE
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
