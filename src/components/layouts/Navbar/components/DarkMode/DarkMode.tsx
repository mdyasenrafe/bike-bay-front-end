import { CiLight } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import {
  getDarkMode,
  toggleDarkMode,
} from "../../../../../redux/features/theme";
import { useAppDispatch, useAppSelector } from "../../../../../redux";

export const DarkMode = () => {
  const isDarkMode = useAppSelector(getDarkMode);
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(toggleDarkMode())}
      className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-full bg-white border border-[#e1e1e1] hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
    >
      {isDarkMode ? <CiLight size={20} /> : <IoMoonOutline size={20} />}
    </div>
  );
};
