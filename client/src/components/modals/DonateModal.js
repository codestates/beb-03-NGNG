import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Tooltip from "@mui/material/Tooltip";
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

export default function DonateModal({ postUserId }) {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [amount, setAmount] = React.useState(0);
  const amountOnChangeHandler = (e) => {
    e.preventDefault();
    console.log(parseInt(e.target.value));
    setAmount(parseInt(e.target.value));
  };

  const donationButtonHandler = async (e) => {
    e.preventDefault();
    const check = window.confirm("진짜 기부하시겠습니까?");
    if (check) {
      const res = await axios.post(
        "/api/contract/transferToken",
        {
          userId: postUserId,
          amount,
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      if (res?.data?.success) {
        const { from, to, transactionHash } = res?.data?.data;
        alert("donation 성공");
      } else {
        alert("donation 실패");
      }
    }
  };

  return (
    <>
      <Tooltip title="Donate 🎁" placement="top">
        <IconButton aria-label="donate" color="secondary" onClick={handleOpen}>
          <VolunteerActivismIcon />
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
            Donation 🎁
          </Typography>
          <Typography>Your donation will be transfered to yooni.</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount of NGT"
              name="amount"
              value={amount}
              inputProps={{
                maxLength: 13,
                step: "1",
              }}
              autoFocus
              onChange={amountOnChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={donationButtonHandler}
            >
              Donate
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
