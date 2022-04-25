import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'primary.light',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [inValid, setInvalid] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loginMutation = useMutation(loginInfo => {
    return axios.post('http://localhost:5001/api/user/login', loginInfo);
  });

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setId(data.get('userId'));
    setPassword(data.get('password'));

    if (id === '' || password === '') {
      setInvalid(true);
      return;
    }

    // id, password로 request -> userInfo를 res로 받아오기 -> 전역 상태 변경
    
    // 데이터 받아오고 상태 변경하기 (isLogedIn, userInfo)
    dispatch(login({id: '', nickname: 'yooni', email: '', emailToken: null, isVerified: false, privateKey: '', tokenAmount: '300'}));
    handleClose();
    setInvalid(false);
  }

  return (
    <>
      <Button variant='contained' color='success' sx={{mr: 3}} onClick={handleOpen}>Log in</Button>
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
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              autoComplete="userId"
              autoFocus
              sx={{ mb: 0}}
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
              sx={{ mb: 2}}
            />
            {
              inValid &&
              <Alert variant='filled' severity="error">All fields must be filled in.</Alert>
            }
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