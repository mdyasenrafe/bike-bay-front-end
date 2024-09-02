import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};

export type TResponse<T> = {
  data: T;
  error: TError;
  meta?: TMeta;
  message: string;
  success: boolean;
  token?: string;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
