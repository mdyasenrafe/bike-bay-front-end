import { Text } from "../components/atoms";

export const renderRentalEmptyMessage = (showPayButton: boolean) => {
  if (!showPayButton) {
    return (
      <Text variant="P2" className="text-center text-gray-500">
        You have no unpaid rentals. Please book a bike to see rental details,
        including start times and payment options here.
      </Text>
    );
  } else {
    return (
      <Text variant="P2" className="text-center text-gray-500">
        You haven't completed any rentals yet. Once you've completed a rental,
        you'll see your paid rental history here.
      </Text>
    );
  }
};
