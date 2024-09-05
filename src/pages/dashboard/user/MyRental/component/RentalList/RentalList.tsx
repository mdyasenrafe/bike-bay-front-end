import React from "react";
import { Card, Button, Row, Col } from "antd";
import { TRental } from "../../../../../../redux/features/rental";
import { Text } from "../../../../../../components/atoms";
import moment from "moment";

type RentalListProps = {
  rentals: TRental[];
  showPayButton?: boolean;
};

export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  showPayButton,
}) => {
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
                        {moment(rental.startTime).fromNow()}
                      </Text>
                      <p className="text-sm text-gray-500">
                        <strong>Return Time:</strong>{" "}
                        {rental.returnTime || "Not yet returned"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Total Cost:</strong> {rental.totalCost}
                      </p>
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
