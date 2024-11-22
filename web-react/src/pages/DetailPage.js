import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useParams, Link } from "react-router-dom";
import Navigator from "../components/Navigator";
import { Sidebar, Landlord, List } from "../components";
import Slideshow from "./SlideShow";
import DetailItem from "./DetailItem";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, getPosts} from '../slices/postSlice';

const DetailPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts()); // Lấy tất cả bài viết
  }, [dispatch]);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId)); 
    }
  }, [dispatch, postId]);
  const post = posts.find(p => p._id === postId);

  return (
    <div className="flex flex-col items-center h-full">
      <Header />
      <Navigator />
      <div className="max-w-screen-xl flex flex-col items-center justify-start mt-3">
        <Outlet />
        <div className="flex flex-col gap-3 w-1100 px-8">          
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link to=""
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link to="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {post.categoryId.name}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {post.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex w-full justify-center gap-5 py-5 shadow-md">
            
            <div className="flex w-[60%] flex-col">
              <Slideshow images={post.images} /> 
            </div>
            <div className=" flex flex-col gap-6 justify-start items-">
              <div className="w-72 m-5 p-5 rounded-lg bg-yellow-200 text-center font-sans"><Landlord user={post.userId} posts={posts} /></div>
            
            </div>
          </div>

          <div className="flex w-full justify-center py-5 gap-4 shadow-md">
            <div className="flex w-[70%]">
              <DetailItem post={post} /> 
            </div>
            <div className="w-[30%] flex flex-col gap-4">
              <Sidebar />
            </div>
          </div>
          
          <div className="flex w-full justify-center">
            <div className="flex">
            <List />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailPage;