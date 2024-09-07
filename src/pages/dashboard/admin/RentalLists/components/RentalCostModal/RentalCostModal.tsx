import { Modal } from "../../../../../../components";
import { Button } from "../../../../../../components/atoms";
import { FormDatePicker, FormWrapper } from "../../../../../../components/form";

type RentalCostModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export const RentalCostModal: React.FC<RentalCostModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const handleCalculate = async (values: {
    startTime: string;
    endTime: string;
  }) => {
    try {
      const startTime = new Date(values.startTime).toISOString();
      const endTime = new Date(values.endTime).toISOString();

      // await calculateRentalCost({ id: selectedRental!, endTime }).unwrap();

      closeModal();
    } catch (error) {}
  };

  return (
    <Modal
      title="Calculate Rental Cost"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <FormWrapper onSubmit={handleCalculate}>
        <FormDatePicker name="endTime" label="End Time" />
        <Button type="primary" htmlType="submit">
          Calculate
        </Button>
      </FormWrapper>
    </Modal>
  );
};
