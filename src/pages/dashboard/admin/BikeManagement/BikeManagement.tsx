import { MainLayout } from "../../../../components/layouts";
import { BikesLayout } from "../../../../components";
import { Button, Container, Text } from "../../../../components/atoms";
import { FaBicycle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const BikeManagement = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Container>
        <div>
          <Text variant="H1" className="text-center mb-4 text-black">
            Bike Management Dashboard
          </Text>
          <Text
            variant="P3"
            style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}
            className="text-black pb-16"
          >
            As an admin, you can manage the entire bike inventory. Create new
            bikes, update details, edit existing listings, and delete bikes. Use
            advanced search, filters, and sorting options to manage your fleet
            efficiently.
          </Text>
        </div>

        <div className="text-end mb-6">
          <Button
            color="primary"
            icon={<FaPlus />}
            size="large"
            className="text-white"
            onClick={() => navigate("/dashboard/admin/create-bike")}
          >
            Create New Bike
          </Button>
        </div>
        <BikesLayout editOption={true} />
      </Container>
    </MainLayout>
  );
};
