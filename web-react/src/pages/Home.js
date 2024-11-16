import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navigator from "../components/Navigator";
import Search from "./Search";
import { Item,ProvinceBtn } from "../components/";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";
import icons from "../ultils/icons";
const { GrNext } = icons;
const location = [
    {
        id: 'hcm',
        name: 'Phòng trọ Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg',
    },
    {
        id: 'hn',  // Moved this line up
        name: 'Phòng trọ Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg',
    },
    {
        id: 'dn',  // Moved this line up
        name: 'Phòng trọ Đà Nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg',
    },
];
const Home = () => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories || {});

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
          <h1 className="text-[28px] font-bold">
            Kênh thông tin Phòng trọ số 1 Việt Nam
          </h1>
          <p className="text-sm text-gray-700">
            Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê
            phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với
            100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.
          </p>
        </div>
        <div className='max-w-1100 flex items-center gap-5 justify-center py-5 shadow-md'> {/* Sửa justify */}
                    {location.map(item => {
                        return (
                            <ProvinceBtn 
                                key={item.id}
                                image={item.image}
                                name={item.name}
                            />
                        );
                    })}
                </div>  
        <div className="max-w-1100 flex justify-center items-center ">
          <div className="flex w-full w-[70%] ">
            <Item />
          </div>
          <div className="w-[30%] border flex flex-col gap-4 justify-start items-center">
            <div className="p-4 rounded-md bg-white w-full">
              <h3 className="text-lg font-semibold">Danh sách cho thuê</h3>
              <div className="flex flex-col gap-1 items-start">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category._id} className="flex items-center">
                      <GrNext size={10} color="#ccc" />
                      <p className="hover:text-red-500">{category.name}</p>
                    </div>
                  ))
                ) : (
                  <p>Không có danh mục nào</p>
                )}
              </div>
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
