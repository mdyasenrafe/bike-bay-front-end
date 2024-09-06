import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../components/layouts";
import { Container } from "../../../components/atoms";
import { LeftSideBar, RightSideBar } from "./components";
import {
  TFilters,
  TProduct,
  useGetProductsQuery,
} from "../../../redux/features/product";

export const Bikes: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [tempFilters, setTempFilters] = useState<TFilters>({
    searchTerm: undefined,
    brand: undefined,
    priceGte: undefined,
    priceLte: undefined,
    sort: undefined,
  });
  const [filters, setFilters] = useState<TFilters>(tempFilters);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading } = useGetProductsQuery({
    ...filters,
    page: currentPage,
    limit: pageSize,
  });

  const handleSearch = (value: string) => {
    setFilters({ ...filters, searchTerm: value });
  };

  const resetFilters = () => {
    setTempFilters({
      searchTerm: undefined,
      brand: undefined,
      priceGte: undefined,
      priceLte: undefined,
      model: undefined,
    });
    setFilters({
      searchTerm: undefined,
      brand: undefined,
      priceGte: undefined,
      priceLte: undefined,
      model: undefined,
    });
  };

  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSideBar]);

  const handleApply = () => {
    setFilters(tempFilters);
    // refetch();
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sort: value });
  };

  return (
    <MainLayout>
      <Container>
        <section className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            <LeftSideBar
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
              resetFilters={resetFilters}
              handleApply={handleApply}
              filters={filters}
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
            />
            <RightSideBar
              setShowSideBar={setShowSideBar}
              products={products?.data as TProduct[]}
              isLoading={isLoading}
              handleSearch={handleSearch}
              handleSortChange={handleSortChange}
              currentPage={currentPage}
              pageSize={pageSize}
              total={products?.meta?.total as number}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
            />
          </div>
        </section>
      </Container>
    </MainLayout>
  );
};
