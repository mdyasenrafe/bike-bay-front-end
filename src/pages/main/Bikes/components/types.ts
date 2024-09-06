import { OptionType, TFilters } from "../../../../redux/features/product";

export type LeftSideBarProps = {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  resetFilters: () => void;
  handleApply: () => void;
  filters: TFilters;
  tempFilters: TFilters;
  setTempFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

export type TFilterType = {
  key: keyof TFilters;
  label: string;
  options?: OptionType[];
  type?: string;
  value: any;
};

export type FilterLayoutProps = {
  item: TFilterType;
  handleFilterChange: (key: keyof TFilters, value: string | number) => void;
};
