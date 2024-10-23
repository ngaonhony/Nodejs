import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navigator from "../components/Navigator";
import { text, location } from "../ultils/constant"; 
import { ProvinceBtn, ItemSidebar, Landlord } from "../components";
import { List } from "./index";
import Slideshow from "./SlideShow";
import Detailitem from "../mockdata/DetailItem";

const DetailPage = () => {
  return (
    <div className="w-1500 flex flex-col items-center h-full border ">
      <Header />
      <Navigator />

      <div className="max-w-1500 flex flex-col items-center justify-start mt-3">
        <Outlet />
      </div>
      <div className="border flex flex-col gap-3">
        <div>
          <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
          <p className="text-sm text-gray-700">{text.HOME_DESCRIPTION}</p>
        </div>
        <div className="w-[1100px] flex items-center gap-5 justify-center py-5 gap-4 shadow-md">
          <div className="flex w-full w-[70%]">
            <Slideshow />
            <div className="w-[30%] border flex flex-col gap-6 justify-start items-">
              <Landlord />
            </div>
          </div>
        </div>
        <div className="w-[1100px] flex justify-center items-center py-5 gap-4 shadow-md ">
          <div className="flex w-full w-[70%] ">
            <Detailitem />
          </div>
          <div className="w-[30%] border flex flex-col gap-4 justify-top items-center">
            <ItemSidebar />
          </div>
        </div>
        <div className="w-[1100px] flex justify-center items-center ">
          <div className="flex w-full w-[70%] ">
            <List />
          </div>
          <div className="w-[30%] border flex flex-col gap-4 justify-start items-center">
            <ItemSidebar />
          </div>
        </div>
      </div>

      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default DetailPage;