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
export type TPaymentStatus = "pending" | "succeeded" | "failed";

export type TRental = {
  _id: string;
  userId: TUser;
  bikeId: TProduct;
  startTime: string;
  totalCost: number;
  isReturned: boolean;
  advancePaymentIntentId: string;
  advancePaymentStatus: TPaymentStatus;
  finalPaymentStatus: TPaymentStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: "booked" | "returned" | "completed";
  paymentStatus: TPaymentStatus;
  returnTime: string;
};

export interface TRentalState {
  rentals: TRental[];
}

export type TRentalCalculateRequest = {
  rentalId: string;
  endTime: string;
};

export type TCompleteRequest = {
  couponCode?: string;
  id: string;
};
