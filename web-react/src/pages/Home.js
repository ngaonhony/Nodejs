import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Search from "./Search";
import { List, ProvinceBtn, Header, Footer, Sidebar,Navigator } from "../components";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";
import { text } from "../ultils/constant";

const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
  },
  {
    id: "hn", // Moved this line up
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
  },
  {
    id: "dn", // Moved this line up
    name: "Phòng trọ Đà Nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="w-full flex flex-col items-center h-full border ">
      <Header />
      <Navigator />
      <div className="max-w-1100 flex flex-col items-center justify-start mt-3">
        <Outlet />
      </div>
      <div className="w-1100 flex items-center justify-between flex-col gap-3">
        <Search />
        <div>
          <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
          <p className="text-base text-gray-700">{text.HOME_DECSCRIPTION}</p>
        </div>
        <div className="max-w-1100 flex items-center gap-5 justify-center py-5 shadow-md">
          {location.map((item) => {
            return (
              <ProvinceBtn key={item.id} image={item.image} name={item.name} />
            );
          })}
        </div>
        <div className="w-1100 flex justify-center">
          <div className="flex w-full w-[70%] ">
            <List/>
          </div>
          <div className="w-[30%] border flex flex-col gap-4 justify-start items-center sticky top-0">
            <div className="p-4 rounded-md bg-white w-full">
              <Sidebar />
            </div>
          </div>
        </div>
        <div className="w-[1100px] flex justify-center items-center "></div>
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
