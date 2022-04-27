import { Card, Button, Box, Tooltip, IconButton, Container, Backdrop, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TagInput from './TagInput';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeTag } from '../redux/tag';
import { useMutation } from 'react-query';
import axios from 'axios';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    flex: 1,
  },
}));

const WriteTalk = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const tags = useSelector((state) => state.tag.tags);

  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  const contentRef = useRef();
  let imgFile;

  const loadFile = (input) => {
    document.getElementById("progress-indicator").style.display = 'block';
		imgFile = input.target.files[0];
    
    setTimeout(() => {
      document.getElementById("progress-indicator").style.display = 'none';
    }, 2500)
	};

  const newPostMutation = useMutation(((formData) => {
      setIsUploading(true);
      return axios({
        method: "post",
        url: '/api/post/sendPost',
        data: formData,
        headers: {
          "Authorization": `bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      })
    }), {
      onSuccess: (data) => {
        setIsUploading(false);
        alert("Post Success!");
        dispatch(initializeTag());
        contentRef.current.value = "";
      },
      onError: (error) => {
        alert(error);
        setIsUploading(false);
      },
    }
  );

  const handleSubmit = (event) => {
    console.log('🎁', imgFile);
    event.preventDefault();

    if (accessToken === undefined) {
      alert("Please Login");
      return;
    }

    if (contentRef.current.value.length === 0) {
      alert("Please fill the field");
      return;
    }

    const stringTags =
      "#" +
      tags.reduce((sum, word) => {
        return sum + "#" + word;
      });

    const formData = new FormData();
    formData.append("content", contentRef.current.value);
    formData.append("tags", stringTags);
    formData.append("image", imgFile);

    newPostMutation.mutate(formData);
  };

  return (
    <>
      {/* <Typography variant="body2" color="primary" fontSize={'28px'}>
        🔥 Hot 10 Tags Now!
      </Typography> */}
      <Card
        sx={{
          backgroundColor: "#606060",
          mb: 2,
          p: 2,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <CreateIcon sx={{ mr: 2 }} />
        <Box sx={{ width: "100%", mr: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Create a Post"
            label=""
            id="content"
            sx={{ mr: 2 }}
            inputRef={contentRef}
          />
          <TagInput />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "inherit",
            pt: 0.5,
          }}
        >
          <input type='file' accept='image/*' className='inputImg' style={{display: 'none'}} id="post-img-file" name="post-img-file" onChange={(e) => loadFile(e)} />
          <label htmlFor="post-img-file">
            <Button
              variant="contained"
              color="success"
              className="inputImg"
              component="span"
              sx={{ height: "30px", mb: 1.5 }}
            >
              <AddPhotoAlternateIcon />
            </Button>
          </label>
            <Button
              type="submit"
              variant="contained"
              color="success"
              id="submit-button"
              onClick={handleSubmit}
              sx={{ height: "30px", width: "60px" }}
            >
              Submit
            </Button>
            <CircularProgress sx={{ml: 1.5, mt: 1.5, display: 'none'}} id="progress-indicator" />
          {
            isUploading &&
            <CircularProgress sx={{ml: 1.5, mt: 1.5}} />
          }
        </Box>
      </Card>
    </>
  );
};

export default WriteTalk;
