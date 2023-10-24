import React, { useEffect, useState } from "react";
import BlogItem from "../blog-item/BlogItem"
import axios from "axios";
import { Container, Row, Form, InputGroup, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import ResponsivePagination from 'react-responsive-pagination'
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../../reducers/blogPost";
import 'react-responsive-pagination/themes/classic.css'


const BlogList = () => {

  const searchData = useSelector((state) => state.post.searchData)

  const dispatch = useDispatch()

  console.log(searchData);

  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState()

  const handleChange = (e) => {
    dispatch(setSearchData(e.target.value))
  }

  const search = async () => {
    if(searchData === "") {
      getBlogPosts()
    } else {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/byTitle?title=${searchData}`)
        setPosts(response.data)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    }
  
  const getBlogPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost?page=${currentPage}`)
        setPosts(response.data)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
  }

  const handlePagination = (value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    if(searchData === "") {
      getBlogPosts()
    }
  }, [currentPage, searchData]
  )

  return (
    <>
      <Container>
          <InputGroup className="mb-3 searchInput">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={handleChange}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={search}>
              Search
            </Button>
          </InputGroup>
        <Row>
          {posts?.post && posts?.post.map((post) => {
            return (
              <BlogItem key={nanoid()} title={post.title} cover={post.cover} author={post.author} _id={post._id}/>
            )
          })}
        </Row>
      </Container>
      <ResponsivePagination
          current={currentPage}
          total={posts && posts.totalPages}
          onPageChange={handlePagination}
      />
    </>
  );
};

export default BlogList;
