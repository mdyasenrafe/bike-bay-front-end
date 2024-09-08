import { MainLayout } from "../../../../components/layouts";
import { BikesLayout } from "../../../../components";
import {
  AdminSectionHeader,
  Button,
  Container,
  Text,
} from "../../../../components/atoms";
import { FaBicycle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const BikeManagement = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Container>
        <div>
          <AdminSectionHeader
            title="Bike Management Dashboard"
            description=" As an admin, you can manage the entire bike inventory. Create new
              bikes, update details, edit existing listings, and delete bikes.
              Use advanced search, filters, and sorting options to manage your
              fleet efficiently."
          />

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
        </div>
        <BikesLayout editOption={true} />
      </Container>
    </MainLayout>
  );
};
