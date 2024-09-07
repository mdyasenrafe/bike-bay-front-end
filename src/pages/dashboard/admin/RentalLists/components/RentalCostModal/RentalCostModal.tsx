import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { Modal } from "../../../../../../components";
import { Button } from "../../../../../../components/atoms";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../../components/form";
import { TRental } from "../../../../../../redux/features/rental";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalCostSchema } from "../../../../../../Schema";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

type TRentalCostInput = {
  endDate: string | Date | dayjs.Dayjs;
  endTime: string | Date | dayjs.Dayjs;
};

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
  const startTime = selectedRental?.startTime;

  const handleCalculate: SubmitHandler<TRentalCostInput> = useCallback(
    (values) => {
      try {
        const combinedDateTime = dayjs(values.endDate)
          .set("hour", dayjs(values.endTime).hour())
          .set("minute", dayjs(values.endTime).minute())
          .utc()
          .toISOString();

        toast.success("Updated successfully");

        closeModal();
      } catch (error: any) {
        console.log(error);
        toast.error(error?.data?.message || "Something went wrong");
      }
    },
    [closeModal]
  );

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      return current && current.isBefore(dayjs(startTime), "day");
    },
    [startTime]
  );

  const schema = useMemo(() => rentalCostSchema(startTime), [startTime]);

  return (
    <Modal
      title="Calculate Rental Cost"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      centered
    >
      <FormWrapper onSubmit={handleCalculate} resolver={zodResolver(schema)}>
        <FormDatePicker
          name="endDate"
          label="End Date"
          disabledDate={disabledDate}
        />
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
