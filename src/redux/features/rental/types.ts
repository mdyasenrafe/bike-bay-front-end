export type TRentalRequest = {
  bikeId: string;
  startTime: string;
  totalCost: number;
};

export type TRentalResponse = {
  rental: TRental;
  clientSecret: string;
};

export type TRental = {
  _id: string;
  bikeId: string;
  userId: string;
  paymentIntentId: string;
  paymentStatus: "pending" | "succeeded" | "failed";
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
};

export interface TRentalState {
  rentals: TRental[];
}
