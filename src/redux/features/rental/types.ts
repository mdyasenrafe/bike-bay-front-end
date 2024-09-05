import { TUser } from "../auth";
import { TProduct } from "../product";

export type TRentalRequest = {
  bikeId: string;
  startTime: string;
};

export type TRentalResponse = {
  rental: TRental;
  clientSecret: string;
};

export type TRental = {
  _id: string;
  bikeId: TProduct;
  userId: TUser;
  paymentIntentId: string;
  paymentStatus: "pending" | "succeeded" | "failed";
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  status: "booked" | "returned" | "completed";
};

export interface TRentalState {
  rentals: TRental[];
}
