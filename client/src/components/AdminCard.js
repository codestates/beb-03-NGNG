import React from "react";
import { Card, Typography, Box, Button, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../redux/user";

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

const AdminCard = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const role = useSelector((state) => state.user.userInfo.role);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // 로그인 했는지 확인
    if (role !== "admin") {
      alert("❗️ Only Admin can access");
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

    axios({
      method: "get",
      url: "/api/admin/pay",
      headers: {},
    })
      .then(() => {
        axios
          .get("/api/user/loadMyInfo", {
            headers: {
              // Authorization: `bearer ${accessToken}`,
            },
          })
          .then((res) => {
            dispatch(getUserInfo(res.data.data));
          });
      })
      .then((data) => {
        alert("😄 You have got your NFT successfully");
      })
      .catch((error) => {
        alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
      });

    handleClose();
  };

  // const getNFTMutation = useMutation((() => {
  //   return axios({
  //     method: "get",
  //     url: '/api/admin/pay',
  //     headers: {
  //
  //     }
  //   })
  //   }), {
  //     onSuccess: (data) => {
  //       alert("😄 You have got your NFT successfully");
  //     },
  //     onError: (error) => {
  //       alert(`
  //       ❗️ Something Wrong! Please try again

  //       (${error})
  //       `);
  //     },
  //   }
  // );

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="gray" fontSize={"24px"}>
          ⚙️ Admin Section
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ width: "200px" }}
          onClick={handleOpen}
        >
          Pay Token to Users
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="h1" variant="h5">
              🪙 Pay reward tokens!
            </Typography>
            <Typography sx={{ mt: 2 }}>
              You can give reward tokens to all users.
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
                PAY NOW
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Card>
  );
};

export default AdminCard;
