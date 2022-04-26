import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTag } from '../redux/tag';
import { deleteTag } from '../redux/tag';

export const TagsInput = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 48px;
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 0 0;
      background: #997322;
        > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: black;
        border-radius: 50%;
        background: #E2B75A;
        cursor: pointer;
      }
    }
  }

  > input {    
    flex: 1;
    border: none;
    background-color: transparent;
    font-size: 15px;
    font-family: 'Montserrat';
    padding: 4px 0 0 0;
    :focus {
    outline: transparent;
    }
  }
`;

const TagInput = (props) => {
  const tags = useSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  const removeTags = (indexToRemove) => {
    dispatch(deleteTag(tags.filter((item, idx) => {
      return idx !== indexToRemove;
    })
  ))};
  
  const addTags = (event) => {
    if (event.target.value.length !== 0 && !tags.includes(event.target.value)) {
      let newTags = [...tags, event.target.value];
      dispatch(addTag(newTags));
      event.target.value = '';
    }
  }

  return (
    <TagsInput>
      <ul id='tags'>
        {tags.map((tag, index) => (
          <li key={index} className='tag'>
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon' onClick={() => removeTags(index)}>
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        className='tag-input'
        type='text'
        onKeyUp={(e)=> {if (e.key === 'Enter') addTags(e)}}
        placeholder='Press enter to add tags'
      />
    </TagsInput>
  )
}

export default TagInput;