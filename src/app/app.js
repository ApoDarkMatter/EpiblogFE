import { configureStore } from "@reduxjs/toolkit";
import blogPost from '../reducers/blogPost'

export const store = configureStore({
  reducer: {
    post: blogPost,
  },
});