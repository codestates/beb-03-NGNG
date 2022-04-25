import { Card, Button, Box, Tooltip, IconButton, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TagInput from './TagInput';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeTag } from '../redux/tag';
import { useMutation } from 'react-query';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.50),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    flex: 1,
  },
}));

const WriteTalk = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const userId = useSelector((state) => state.user.userInfo.id);
  const tags = useSelector((state) => state.tag.tags);
  const dispatch = useDispatch();
  const contentRef = useRef();

  const handleOpen = () => {

  }

  const newPostMutation = useMutation(((newPost) => {
    console.log(newPost);
    return axios.post('http://localhost:5001/api/post/sendPost', newPost, {
      headers: {
        "Authorization": `bearer ${accessToken}`
      }
    });
  }), {
  onSuccess: (data) => {
    alert('Post Success!');
    dispatch(initializeTag());
    contentRef.current.value = '';
  },
  onError: (error) => {
    alert('Something Wrong! Try again');
  }
});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (accessToken === undefined) {
      alert('Please Login');
      return;
    }

    if (contentRef.current.value.length === 0) {
      alert('Please fill the field');
      return;
    }

    const stringTags = '#' + tags.reduce((sum, word) => {
      return sum + '#' + word
    });

    const post = {
      content: contentRef.current.value,
      id: userId,
      category: '',
      tags: stringTags
    }

    newPostMutation.mutate(post);
  }

  return (
    <>
      {/* <Typography variant="body2" color="primary" fontSize={'28px'}>
        🔥 Hot 10 Tags Now!
      </Typography> */}
      <Card sx={{backgroundColor: '#606060', mb: 2, p: 2, display: 'flex', alignItems: 'flex-start'}}>
        <CreateIcon sx={{mr: 2}} />
        <Box sx={{width: '100%', mr: 2}}>
          <TextField 
          fullWidth
          multiline
          rows={2}
          placeholder='Create a Post'
          label=''
          id='content'
          sx={{mr: 2}}
          inputRef = {contentRef}
        />
        <TagInput />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'inherit', pt: 0.5}}>
          <Button variant='contained' color='success' onClick={handleOpen} sx={{height: '30px', mb: 1.5}}><AddPhotoAlternateIcon /></Button>
          <Button type='submit' variant='contained' color='success' onClick={handleSubmit} sx={{height: '30px', width: '60px'}}>Submit</Button>
        </Box>
      </Card>
    </>
  )
}

export default WriteTalk;