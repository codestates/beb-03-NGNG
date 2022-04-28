import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';

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

export default function PostEditModal({uuid}) {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const contentRef = useRef();

  const postEditMutation = useMutation(((edited) => {
    return axios({
      method: "put",
      url: '/api/post/updatePost',
      data: edited,
      headers: {
        "Authorization": `bearer ${accessToken}`,
        "Content-Type": 'application/json'
      }
    })
    }), {
      onSuccess: (data) => {
        alert("Post Edit Success!");
      },
      onError: (error) => {
        alert(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contentRef.current.value === '') {
      alert('Please enter content');
      return;
    }

    const edited = {
      postUuid: uuid,
      content: contentRef.current.value
    }

    postEditMutation.mutate(edited);
    handleClose();
  }


  return (
    <>
      <Tooltip title="Edit" placement='top'>
        <IconButton aria-label="donate" onClick={handleOpen}>
          <EditIcon />
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
            ✏️ Edit the Post
          </Typography>
          <Typography>
            Please enter new content below.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-content"
              label="new content.."
              name="email"
              autoComplete="email"
              autoFocus
              multiline
              rows={3}
              inputRef={contentRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}