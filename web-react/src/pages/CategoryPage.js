import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, Header, Footer, Sidebar, Navigator } from "../components";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, categoryId]);

  return (
    <div className="w-full flex flex-col items-center h-full border">
      <Header />
      <Navigator />
      <div className="max-w-1100 flex flex-col items-center justify-start mt-3">
        <div className="w-1100 flex justify-center">
          <div className="flex w-full w-[70%]">
            <List categoryId={categoryId} />
          </div>
          <div className="w-[30%] border flex flex-col gap-4 justify-start items-center sticky top-0">
            <div className="p-4 rounded-md bg-white w-full">
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
