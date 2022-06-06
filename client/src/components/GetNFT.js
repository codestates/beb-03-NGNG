import { Button, Typography, Box, Modal } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";

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

const GetNFT = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // 로그인 했는지 확인
    if (!accessToken) {
      alert("❗️ Please Log in");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getNFTMutation.mutate();
    handleClose();
  };

  const getNFTMutation = useMutation(
    () => {
      return axios({
        method: "post",
        url: "/api/contract/mintNFT",
        headers: {},
      });
    },
    {
      onSuccess: (data) => {
        alert("😄 You have got your NFT successfully");
      },
      onError: (error) => {
        alert(`
        ❗️ Something Wrong! Please try again
  
        (${error})
        `);
      },
    }
  );

  return (
    <>
      <Typography
        color="primary"
        variant="h5"
        sx={{ mt: 3, textAlign: "center" }}
      >
        Mint NGNG NFT 🔖
      </Typography>
      <Typography sx={{ mt: 3 }}>
        If you have NGNG NFT, you can get bigger token rewards.
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 3, mb: 3 }}
        onClick={handleOpen}
      >
        Get Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            🔖 Give a LIKE!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            The price of NGNG NFT is 10NGT. Do you want to mint now?
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
              GET
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GetNFT;
