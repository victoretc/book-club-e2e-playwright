/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export const ContentType = {
  Json: "application/json",
  FormData: "multipart/form-data",
  UrlEncoded: "application/x-www-form-urlencoded",
  Text: "text/plain",
} as const;
export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export type RequestOptions = {
  timeout?: number;
  headers?: Record<string, string>;
  validateStatus?: boolean;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    body: string,
  ) {
    super(`API error ${status}: ${body}`);
    this.name = "ApiError";
  }
}
