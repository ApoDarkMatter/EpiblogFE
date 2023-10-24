import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    searchData: "",
    isLoading: false,
    searchVisible: true,
    currentPost: {},
    currentComment: {comment: "e",rate: 0},
    modify: false,
    search: false,
}

export const blogPost = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
      setIsLoading: (state,action) => {
        state.isLoading = action.payload
      },
      setSearchData: (state,action) => {
        state.searchData = action.payload
      },
      setSearchVisible: (state,action) => {
        state.searchVisible = action.payload
      },
      setCurrentPost: (state,action) => {
        state.currentPost = action.payload
      },
      setCurrentComment: (state,action) => {
        state.currentComment = {...state.currentComment,...action.payload}
      },
      setModify: (state,action) => {
        state.modify = action.payload
      },
      setSearch: (state,action) => {
        state.search = action.payload
      }
  }});
  
  // Action creators are generated for each case reducer function
  export const { setIsLoading, setSearchData,setSearchVisible, setSearchResultData, setCurrentComment, setCurrentPost, setModify, setSearch } = blogPost.actions;
  
  export default blogPost.reducer;