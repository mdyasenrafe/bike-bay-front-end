import React, { useState, useEffect } from "react";
import { Select, Button, message, Table } from "antd";
import { useLocation } from "react-router";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { AdminSectionHeader, Container, Text } from "../../../components/atoms";
import {
  TProduct,
  useGetProductsByIdQuery,
} from "../../../redux/features/product";
import { toast } from "sonner";
import { BikesLayout } from "../../../components";

export const CompareProduct = () => {
  const location = useLocation();
  const [selectedBikeIds, setSelectedBikeIds] = useState<string[]>([]);
  const [selectedBikes, setSelectedBikes] = useState<TProduct[]>([]);
  const [bikeIdToFetch, setBikeIdToFetch] = useState<string>("");

  const queryParams = new URLSearchParams(location.search);
  const initialBikeId = queryParams.get("bikeId");

  const {
    data: bikeData,
    isLoading: isBikeLoading,
    isFetching,
  } = useGetProductsByIdQuery(bikeIdToFetch, {
    skip: !bikeIdToFetch || selectedBikeIds.includes(bikeIdToFetch),
  });

  useEffect(() => {
    if (initialBikeId && !selectedBikeIds.includes(initialBikeId)) {
      setBikeIdToFetch(initialBikeId);
    }
  }, [initialBikeId, selectedBikeIds]);

  useEffect(() => {
    if (bikeData?.data && !selectedBikeIds.includes(bikeIdToFetch!)) {
      setSelectedBikes((prevBikes) => [
        ...prevBikes,
        bikeData.data as TProduct,
      ]);
      setSelectedBikeIds((prevIds) => [...prevIds, bikeIdToFetch!]);
    }
  }, [bikeData, bikeIdToFetch, selectedBikeIds]);

  const handleBikeSelect = (bikeId: string) => {
    if (selectedBikeIds.length >= 3) {
      toast.warning("You can only compare up to 3 bikes.");
      return;
    }

    if (selectedBikeIds.includes(bikeId)) {
      toast.warning("Bike is already added to the comparison.");
      return;
    }
    setBikeIdToFetch(bikeId);
  };

  const removeBikeFromComparison = (bikeId: string) => {
    setSelectedBikes((prevBikes) =>
      prevBikes.filter((bike) => bike._id !== bikeId)
    );
    setSelectedBikeIds((prevIds) => prevIds.filter((id) => id !== bikeId));
  };

  // Table columns for comparison
  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    ...selectedBikes.map((bike) => ({
      title: bike.name,
      dataIndex: bike._id,
      key: bike._id,
      render: (value: any) => <span>{value}</span>,
    })),
  ];

  // Table data (attributes) for comparison
  const data = [
    {
      key: "price",
      attribute: "Price Per Hour",
      ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
        acc[bike._id] = `৳${bike.pricePerHour}`;
        return acc;
      }, {}),
    },
    {
      key: "model",
      attribute: "Model",
      ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
        acc[bike._id] = bike.model;
        return acc;
      }, {}),
    },
    {
      key: "brand",
      attribute: "Brand",
      ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
        acc[bike._id] = bike.brand;
        return acc;
      }, {}),
    },
    {
      key: "availability",
      attribute: "Availability",
      ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
        acc[bike._id] = bike.isAvailable ? "Available" : "Unavailable";
        return acc;
      }, {}),
    },
    {
      key: "description",
      attribute: "Description",
      ...selectedBikes.reduce<{ [key: string]: string }>((acc, bike) => {
        acc[bike._id] = bike.description;
        return acc;
      }, {}),
    },
  ];

  return (
    <MainLayout>
      <Container>
        <div className="my-8">
          <AdminSectionHeader
            title="Compare Bikes"
            description="Easily compare the features and pricing of different bikes available on BikeBay. Select up to three bikes to see their details side by side and make an informed decision."
          />
        </div>

        {/* Comparison Table */}
        {selectedBikes.length > 0 ? (
          <div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={isBikeLoading || isFetching}
            />
            <div className="mt-4 text-center">
              {selectedBikes.map((bike) =>
                bike._id == initialBikeId ? (
                  <></>
                ) : (
                  <Button
                    key={bike._id}
                    color="danger"
                    onClick={() => removeBikeFromComparison(bike._id)}
                    className="mx-2"
                  >
                    Remove {bike.name}
                  </Button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Text variant="P3">
              Select at least one bike to begin comparing features. Once
              selected, you can view detailed specifications side by side to
              help make an informed decision.
            </Text>
          </div>
        )}
        <div className="mt-12">
          <AdminSectionHeader
            title="Available Bikes"
            description="Browse through our collection of bikes and select the ones you'd like to compare. Use this tool to understand the differences between models, pricing, and availability."
          />
          <BikesLayout
            editOption={false}
            compareMode={true}
            handleCompareSelect={handleBikeSelect}
          />
        </div>
      </Container>
    </MainLayout>
  );
};
