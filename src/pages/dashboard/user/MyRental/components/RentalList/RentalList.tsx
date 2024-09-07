import React from "react";
import { Card, Row, Col } from "antd";
import { TRental } from "../../../../../../redux/features/rental";
import { Button, Text } from "../../../../../../components/atoms";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  formatEndTime,
  formatStartTime,
  renderRentalEmptyMessage,
} from "../../../../../../utils";

dayjs.extend(relativeTime);

type RentalListProps = {
  rentals: TRental[];
  showPayButton: boolean;
};

export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  showPayButton,
}) => {
  return (
    <div className="space-y-4">
      {rentals.length === 0 ? (
        <div style={{ maxWidth: 600 }} className="mx-auto">
          <Text variant="H3" className="mb-4 text-center">
            No Rentals Available
          </Text>
          {renderRentalEmptyMessage(showPayButton)}
        </div>
      ) : (
        <Row justify="center" gutter={[16, 16]}>
          {rentals.map((rental) => (
            <Col key={rental?._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                key={rental._id}
                hoverable
                cover={
                  <img
                    alt={rental?.bikeId?.name}
                    src={rental?.bikeId?.thumb}
                    className="h-48 object-cover w-full"
                  />
                }
                className="border rounded-lg shadow-lg flex flex-col"
              >
                <Card.Meta
                  title={<Text variant={"H4"}>{rental.bikeId.name}</Text>}
                  description={
                    <>
                      <Text variant={"P2"}>
                        <strong>Start Time:</strong>{" "}
                        {formatStartTime(rental.startTime)}
                      </Text>
                      <Text variant={"P2"}>
                        <strong>Return Time:</strong>{" "}
                        {rental?.returnTime
                          ? formatEndTime(rental?.returnTime)
                          : "Not yet returned"}
                      </Text>
                      <Text variant={"P2"}>
                        <strong>Total Cost:</strong> {rental.totalCost}
                      </Text>
                    </>
                  }
                />
                {showPayButton && (
                  <Button
                    color="primary"
                    className="h-[37px] text-[16px] text-white mt-5 font-poppins w-[138px]"
                    disabled={!rental?.isReturned}
                  >
                    Pay Now
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
