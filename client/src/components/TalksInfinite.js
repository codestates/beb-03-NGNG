import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Talk from './Talk';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query';

const TalksInfinite = ({ filter }) => {
  const loginedUserId = useSelector((state) => state.user.userInfo.id);
  const { ref, inView } = useInView();

  const { 
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    } = useInfiniteQuery('getPosts', () => {

      return axios.get('/api/post/getPosts')
      .then((res) => {
        return res.data.data.posts;
      })
    },
    {
      getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
      getNextPageParam: lastPage => lastPage.nextId ?? undefined,
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView])

  return (
    <>
      <div>
        <button
          onClick={() => fetchPreviousPage()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
          {isFetchingPreviousPage
            ? 'Loading more...'
            : hasPreviousPage
            ? 'Load Older'
            : 'Nothing more to load'}
        </button>
      </div>

      {
        filter &&
        data
        .filter((post) => {
          return post.user_id === loginedUserId;
        })
        .map((post) => {
          return <Talk key={post.post_uuid} uuid={post.post_uuid} />
        })
      }
      {
        (!filter) &&
        data.map((post) => {
          return <Talk key={post.post_uuid} uuid={post.post_uuid} />
        })
      }

      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
    </>
  )
}

export default TalksInfinite;