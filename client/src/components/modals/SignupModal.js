import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useMutation } from 'react-query';
import { CircularProgress } from '@mui/material';

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
  const [isUploading, setIsUploading] = useState(false);
  const [readingImg, setReadingImg] = useState(false);

  const idRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  let imgFile;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInvalid('');
  }

  const signupMutation = useMutation(((formData) => {
      setIsUploading(true);
      return axios({
        method: "post",
        url: '/api/user/register',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
  }), {
    onSuccess: (data) => {
      setIsUploading(false);
      alert('😄 You have been successfully signed up');
      handleClose();
    },
    onError: (error) => {
      alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
      setIsUploading(false);
    }
  });

  const loadFile = (event) => {
    document.getElementById("progress-indicator2").style.display = 'block';
    imgFile = event.target.files[0];
    setTimeout(() => {
      document.getElementById("progress-indicator2").style.display = 'none';
    }, 4000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (idRef.current.value === '' || emailRef.current.value === '' || passwordRef.current.value === '' || passwordConfirmRef.current.value === '') {
      setInvalid('blank');
      return;
    }

    if (idRef.current.value.length < 5) {
      setInvalid('shortId');
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setInvalid('passwordError');
      return;
    } else {
      const formData = new FormData();
      formData.append("id", idRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);
      formData.append("image", imgFile);

      setInvalid('');
      // id, email, password, image 를 서버에 보내서 register 처리해주기!
      signupMutation.mutate(formData);
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
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {
              isUploading &&
              <CircularProgress color="secondary" />
            }
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit} encType='multipart/form-data'>
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
              inputRef={idRef}
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
              inputRef={emailRef}
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
              inputRef={passwordRef}
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
              inputRef={passwordConfirmRef}
            />
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <CircularProgress color="secondary" sx={{mr: 2, mt: 2, p: 0.8, display: 'none'}} id="progress-indicator2" />
            <input type='file' accept='image/*' className='inputImg' style={{display: 'none'}} id="profile-img-file" name="profile-img-file" onChange={loadFile.bind(this)} />
            <label htmlFor="profile-img-file" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button variant="outlined" color='secondary' component="span" className='inputImg' sx={{mt: 2}}>
                Select Profile Image
              </Button>
            </label>
            </Box>
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