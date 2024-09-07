import React, { useCallback } from "react";
import { Card, Col, Row, Badge, Tooltip } from "antd";
import { TRental } from "../../../../../../../../redux/features/rental";
import { Button, Text } from "../../../../../../../../components/atoms";
import { formatEndTime, formatStartTime } from "../../../../../../../../utils";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

type RentalCardsProps = {
  rentals: TRental[];
  showPayButton: boolean;
  onPayClick: (rental: TRental) => void;
};

export const RentalCards: React.FC<RentalCardsProps> = ({
  rentals,
  showPayButton,
  onPayClick,
}) => {
  const handlePayClick = useCallback(
    (rental: TRental) => {
      onPayClick(rental);
    },
    [onPayClick]
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "booked":
        return <Badge status="default" text="Booked" />;
      case "returned":
        return <Badge status="processing" text="Returned" />;
      case "completed":
        return <Badge status="success" text="Completed" />;
      default:
        return <Badge status="default" text="Unknown" />;
    }
  };

  return (
    <Row justify="center" gutter={[16, 16]}>
      {rentals.map((rental) => (
        <Col key={rental._id} xs={24} sm={12} md={12} lg={8} xl={6}>
          <Card
            hoverable
            cover={
              <img
                alt={rental.bikeId.name}
                src={rental.bikeId.thumb}
                className="h-48 object-cover w-full"
              />
            }
            className="border rounded-lg shadow-lg flex flex-col"
          >
            <div className="mb-3">{getStatusBadge(rental.status)}</div>
            <Card.Meta
              title={<Text variant={"H4"}>{rental.bikeId.name}</Text>}
              description={
                <>
                  <Text variant={"P2"}>
                    <strong>Start Time:</strong>{" "}
                    {formatStartTime(rental?.startTime)}
                  </Text>
                  <Text variant={"P2"}>
                    <strong>Return Time:</strong>{" "}
                    {rental.returnTime
                      ? formatEndTime(rental?.returnTime)
                      : "Not yet returned"}
                  </Text>
                  <Text variant={"P2"}>
                    <strong>Total Cost:</strong> ${rental.totalCost.toFixed(2)}
                  </Text>
                </>
              }
            />
            {showPayButton && (
              <Button
                color="primary"
                className="mt-5 w-full text-white"
                onClick={() => handlePayClick(rental)}
                disabled={!rental.isReturned}
              >
                Pay Now
              </Button>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};
