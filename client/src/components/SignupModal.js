import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useMutation } from 'react-query';

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

export default function SignupModal() {
  const [inValid, setInvalid] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInvalid('');
  }

  const signupMutation = useMutation(((info) => {
      return axios.post('http://localhost:5001/api/user/register', info);
  }), {
    onSuccess: (data) => {
      alert('Sign Up Success!');
      handleClose();
    },
    onError: (error) => {
      alert('Something Wrong! Try again');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = data.get('userId');
    const email = data.get('email');
    const password = data.get('password');
    const password2 = data.get('password2');

    if (userId === '' || email === '' || password === '' || password2 === '') {
      setInvalid('blank');
      return;
    }

    if (userId.length < 5) {
      setInvalid('shortId');
      return;
    }

    if (password !== password2) {
      setInvalid('passwordError');
      return;
    } else {
      setInvalid('');
      // id, email, password 를 서버에 보내서 register 처리해주기!
      signupMutation.mutate({
        id: userId,
        email: email,
        password: password
      });
    }
  }

  return (
    <>
      <Button variant='contained' color='success' onClick={handleOpen}>Sign up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Sign up
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
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              sx={{ mb: 0, background: 'transparent'}}
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
              sx={{ mb: 0}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password2"
              type="password"
              id="password2"
              autoComplete="current-password"
              sx={{ mb: 0}}
            />
            {
              inValid === 'blank' &&
              <Alert variant='filled' severity="error" sx={{mt: 2}}>All fields must be filled in.</Alert>
            }
            {
              inValid === 'shortId' &&
              <Alert variant='filled' severity="error" sx={{mt: 2}}>ID should be longer than 5.</Alert>
            }
            {
              inValid === 'passwordError' &&
              <Alert variant='filled' severity="error" sx={{mt: 2}}>The two passwords do not match.</Alert>
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