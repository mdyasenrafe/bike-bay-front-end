import React from "react";
import { Card, Button, Row, Col } from "antd";
import { TRental } from "../../../../../../redux/features/rental";
import { Text } from "../../../../../../components/atoms";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type RentalListProps = {
  rentals: TRental[];
  showPayButton?: boolean;
};

export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  showPayButton,
}) => {
  const formatStartTime = (startTime: string) => {
    const localStartTime = dayjs(startTime).local();
    const now = dayjs();

    if (now.isBefore(localStartTime)) {
      return `Starts at ${localStartTime.format("h:mm A, MMM D")}`;
    } else {
      return localStartTime.fromNow();
    }
  };

  return (
    <div className="space-y-4">
      {rentals.length === 0 ? (
        <p className="text-gray-500 text-center">No Rentals Available</p>
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
                        {rental.returnTime
                          ? dayjs(rental.returnTime).local().fromNow()
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
                    type="primary"
                    className="mt-4"
                    onClick={() =>
                      console.log(`Paying for rental ${rental._id}`)
                    }
                  >
                    Pay
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
