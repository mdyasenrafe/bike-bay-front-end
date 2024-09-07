import { Modal } from "../../../../../../components";
import { Button } from "../../../../../../components/atoms";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../../components/form";
import { TRental } from "../../../../../../redux/features/rental";

type RentalCostModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedRental: TRental;
};

export const RentalCostModal: React.FC<RentalCostModalProps> = ({
  isModalOpen,
  closeModal,
  selectedRental,
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
  const startTime = selectedRental?.startTime;
  return (
    <Modal
      title="Calculate Rental Cost"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <FormWrapper onSubmit={handleCalculate}>
        <FormDatePicker name="endDate" label="End Date" />
        <FormTimePicker name="endTime" label="End Time" />
        <Button
          color="primary"
          htmlType="submit"
          className="w-full h-[48px] text-[18px] text-white"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
};
