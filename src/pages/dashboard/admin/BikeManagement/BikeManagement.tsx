import { MainLayout } from "../../../../components/layouts";
import { BikesLayout } from "../../../../components";
import { Container, Text } from "../../../../components/atoms";

export const BikeManagement = () => {
  return (
    <MainLayout>
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
      <Container>
        <BikesLayout editOption={true} />
      </Container>
    </MainLayout>
  );
};
