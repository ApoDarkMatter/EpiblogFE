import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import axios from "axios";
import AddComment from "../../components/comments/addComment/AddComment";
import { useDispatch } from "react-redux";
import { setSearchVisible } from "../../reducers/blogPost";
import CommentsList from "../../components/comments/commentsList/CommentsList";

const Blog = () => {
  const {id} = useParams()

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()


  const getBlogPost = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPost/${id}`)
      setBlog(response.data.post)
      console.log(response.data.post);
    } catch (error) {
      console.log(error);
    }
  }


  const navigate = useNavigate();
  useEffect(() => {
    getBlogPost()
    if (blog) {
      setLoading(false);
    } else {
      navigate("/404");
    }
    dispatch(setSearchVisible(false))
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
                {/*<div>{blog.readTime.value} {blog.readTime.unit}</div>*/}
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
        <AddComment/>
        <CommentsList/>
      </div>
    );
  }
};

export default Blog;
