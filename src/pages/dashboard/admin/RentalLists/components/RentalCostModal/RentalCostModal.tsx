import React, { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Modal } from "../../../../../../components";
import { Button, Text } from "../../../../../../components/atoms";
import {
  FormDatePicker,
  FormTimePicker,
  FormWrapper,
} from "../../../../../../components/form";
import {
  TRental,
  useCalculateRentalCostMutation,
} from "../../../../../../redux/features/rental";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalCostSchema } from "../../../../../../Schema";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // hooks
  const [calculateRentalCost, { isLoading }] = useCalculateRentalCostMutation();
  const startTime = selectedRental?.startTime;

  const handleCalculate: SubmitHandler<TRentalCostInput> = useCallback(
    async (values) => {
      try {
        const combinedDateTime = dayjs(values.endDate)
          .set("hour", dayjs(values.endTime).hour())
          .set("minute", dayjs(values.endTime).minute())
          .utc()
          .toISOString();
        const response = await calculateRentalCost({
          rentalId: selectedRental._id as string,
          endTime: combinedDateTime,
        }).unwrap();
        const totalCost = response?.data?.totalCost as number;
        console.log(totalCost);
        setTotalCost(totalCost);
        setSubmitted(true);
      } catch (error: any) {
        toast.error(error?.data?.message);
        setTotalCost(null);
        setSubmitted(false);
      }
    },
    [selectedRental]
  );

  const disabledDate = useCallback(
    (current: dayjs.Dayjs) => {
      const isBeforeStart =
        current && current.isBefore(dayjs(startTime), "day");
      const isAfterToday = current && current.isAfter(dayjs(), "day");
      return isBeforeStart || isAfterToday;
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
      {!submitted ? (
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
            disabled={isLoading}
            loading={isLoading}
          >
            Submit
          </Button>
        </FormWrapper>
      ) : (
        <div className="text-center">
          <Text variant="P1">
            Total cost calculated successfully: <strong>৳{totalCost}</strong>.
            The bike is now available, and the user can pay the pending amount
            from their dashboard.
          </Text>
          <Button onClick={closeModal} className="w-full mt-6" color="primary">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};
