import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "antd";
import { useLocation } from "react-router";
import { MainLayout } from "../../../components/layouts/MainLayout";
import { AdminSectionHeader, Container, Text } from "../../../components/atoms";
import {
  TProduct,
  useGetProductsByIdQuery,
} from "../../../redux/features/product";
import { toast } from "sonner";
import { BikesLayout } from "../../../components";
import { ComparisonTable } from "./components";

export const CompareProduct = () => {
  const location = useLocation();
  const [selectedBikeIds, setSelectedBikeIds] = useState<string[]>([]);
  const [selectedBikes, setSelectedBikes] = useState<TProduct[]>([]);
  const [bikeIdToFetch, setBikeIdToFetch] = useState<string>("");

  const queryParams = new URLSearchParams(location.search);
  const initialBikeId = queryParams.get("bikeId");

  // Fetch bike data based on the selected bikeIdToFetch
  const {
    data: bikeData,
    isLoading: isBikeLoading,
    isFetching,
  } = useGetProductsByIdQuery(bikeIdToFetch, {
    skip: !bikeIdToFetch || selectedBikeIds.includes(bikeIdToFetch),
  });

  // Add the initial bike from query param to comparison
  useEffect(() => {
    if (initialBikeId && !selectedBikeIds.includes(initialBikeId)) {
      setBikeIdToFetch(initialBikeId); // Set the bike to fetch its data
    }
  }, [initialBikeId, selectedBikeIds]);

  // Add fetched bike data to the list
  useEffect(() => {
    if (bikeData?.data && !selectedBikeIds.includes(bikeData.data._id)) {
      setSelectedBikes((prevBikes) => [
        ...prevBikes,
        bikeData.data as TProduct,
      ]);
      setSelectedBikeIds((prevIds) => [...prevIds, bikeData.data._id]);
      setBikeIdToFetch(""); // Reset bikeIdToFetch to avoid refetching
    }
  }, [bikeData, selectedBikeIds]);

  // Handle bike selection
  const handleBikeSelect = useCallback(
    (bikeId: string) => {
      if (selectedBikeIds.length >= 3) {
        toast.warning("You can only compare up to 3 bikes.");
        return;
      }

      if (selectedBikeIds.includes(bikeId)) {
        toast.warning("Bike is already added to the comparison.");
        return;
      }

      setBikeIdToFetch(bikeId);
      toast.success("Bike is added to the comparison.");
    },
    [selectedBikeIds]
  );

  const removeBikeFromComparison = useCallback(
    (bikeId: string) => {
      setSelectedBikes((prevBikes) =>
        prevBikes.filter((bike) => bike._id !== bikeId)
      );
      setSelectedBikeIds((prevIds) => prevIds.filter((id) => id !== bikeId));
      toast.success("Bike is removed to the comparison.");
      setBikeIdToFetch("");
    },
    [selectedBikes, bikeIdToFetch]
  );

  return (
    <MainLayout>
      <Container>
        <div className="my-8">
          <AdminSectionHeader
            title="Compare Bikes"
            description="Easily compare the features and pricing of different bikes available on BikeBay. Select up to three bikes to see their details side by side and make an informed decision."
          />
        </div>

        {selectedBikes.length > 0 ? (
          <ComparisonTable
            selectedBikes={selectedBikes}
            removeBikeFromComparison={removeBikeFromComparison}
            isLoading={isBikeLoading || isFetching}
            initialBikeId={initialBikeId}
          />
        ) : (
          <div style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}>
            <Text variant="P3">
              Select at least one bike to begin comparing features. Once
              selected, you can view detailed specifications side by side to
              help make an informed decision.
            </Text>
          </div>
        )}

        <div className={`${selectedBikes.length === 0 ? "mt-20" : "mt-12"}`}>
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
