import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FilterLayout } from "../FilterLayout";
import { LeftSideBarProps, TFilterType } from "../types";
import {
  TFilters,
  useGetBikeBrandsQuery,
} from "../../../../redux/features/product";
import { AvailableData } from "../../../../constant";
import { Button, LoadingSpinner, Text } from "../../../atoms";
import { useAppSelector } from "../../../../redux";
import { getDarkMode } from "../../../../redux/features/theme";

export const LeftSideBar: React.FC<LeftSideBarProps> = ({
  showSideBar,
  setShowSideBar,
  resetFilters,
  filters,
  setTempFilters,
  tempFilters,
  handleApply,
}) => {
  const {
    data: brands,
    isFetching,
    isLoading,
  } = useGetBikeBrandsQuery(undefined);
  const filterTypes: TFilterType[] = [
    {
      key: "brand",
      label: "brand",
      options: brands?.data,
      value: tempFilters.brand,
    },
    {
      key: "isAvailable",
      label: "Available",
      options: AvailableData,
      value: tempFilters.isAvailable,
    },
    {
      key: "pricePerHour",
      label: "Price",
      type: "input",
      value: { min: tempFilters.priceGte, max: tempFilters.priceLte },
    },
  ];

  const handleFilterChange = (name: keyof TFilters, value: any) => {
    setTempFilters({ ...tempFilters, [name]: value });
  };
  const darkMode = useAppSelector(getDarkMode);

  return (
    <div
      className={`${
        showSideBar
          ? "inline col-span-1 fixed top-0 left-0 z-30 w-full h-screen overflow-y-auto transition-transform bg-white pt-4"
          : "hidden"
      } md:inline dark:bg-black`}
    >
      <div className="flex justify-between mx-4 md:mx-0">
        <Text variant="H3" className="mb-4 ">
          Filter by{" "}
        </Text>
        <AiOutlineClose
          onClick={() => setShowSideBar(false)}
          className="text-2xl cursor-pointer md:hidden"
          color={darkMode ? "white" : "black"}
        />
      </div>
      {isFetching || isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <div className="mx-4 md:mx-0">
            {filterTypes.map((item) => (
              <FilterLayout
                item={item}
                handleFilterChange={handleFilterChange}
              />
            ))}
          </div>
          <div
            className={`${
              showSideBar &&
              "fixed bottom-0 border-t border-t-[#e1e1e1] bg-white shadow-md z-36 w-full h-[80px] items-center"
            } flex justify-around mt-8`}
          >
            <Button
              onClick={resetFilters}
              className="hover:shadow-md w-[45%] rounded-[8px] h-[48px] duration-500 bg-none"
            >
              Reset
            </Button>
            <Button
              color="primary"
              className="rounded-[8px] w-[45%] h-[48px] duration-500 text-white"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
