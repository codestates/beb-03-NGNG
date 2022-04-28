import React from 'react';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { selectTag } from '../redux/selectedTag';
import { useNavigate } from 'react-router-dom';

const Tag = ({keyword, color}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTag = useSelector((state) => state.selectedTag.tag);

  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/tagselected', {state: keyword});
  }

  return (
    <>
      <Chip label={keyword} component="a" clickable href="/" color={color} variant='outlined'
        sx={{m:1}} onClick={handleClick} />
    </>
  )
}

export default Tag;