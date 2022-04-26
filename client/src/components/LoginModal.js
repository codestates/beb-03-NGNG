import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login, getUserInfo } from "../redux/user";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

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

export default function LoginModal() {
  const dispatch = useDispatch();
  const [inValid, setInvalid] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInvalid(false);
  };

  const loginMutation = useMutation(
    (loginInfo) => {
      return axios.post("http://localhost:5001/api/user/login", loginInfo);
    },
    {
      onSuccess: (data) => {
        alert("Login Success!");
        handleClose();
        setInvalid(false);
        const accessToken = data.data.data.token;
        dispatch(login(accessToken));

        // userInfo 가져와서 전역변수 설정
        axios
          .get("http://localhost:5001/api/user/getUser", {
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
          })
          .then((res) => {
            dispatch(getUserInfo(res.data.data.user));
          });
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("userId");
    const password = data.get("password");

    if (id === "" || password === "") {
      setInvalid(true);
      return;
    }

    // id, password로 request -> userInfo를 res로 받아오기 -> 전역 상태 변경
    loginMutation.mutate({
      id: id,
      password: password,
    });

    // 데이터 받아오고 상태 변경하기 (accessToken, userInfo)
    // dispatch(login({
    //   accessToken: '',
    //   userInfo: {
    //     id: '',
    //     email: '',
    //     emailToken: null,
    //     isVerified: false,
    //     privateKey: '',
    //     tokenAmount: '300'
    //   }}));
    // handleClose();
    // setInvalid(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ mr: 3 }}
        onClick={handleOpen}
      >
        Log in
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              autoComplete="userId"
              autoFocus
              sx={{ mb: 0 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />
            {inValid && (
              <Alert variant="filled" severity="error">
                All fields must be filled in.
              </Alert>
            )}
            {loginMutation.isError ? (
              <Alert variant="filled" severity="error">
                ID or Password Wrong!
              </Alert>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
