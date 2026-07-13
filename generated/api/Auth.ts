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

import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { RouteConfig } from "../mock";
import {
  RequestCode,
  RequestCodeRequest,
  RetrieveCodeRequest,
  RetrieveCodeResponse,
  TokenBlacklistRequest,
  TokenObtainPairWithProperMessage,
  TokenObtainPairWithProperMessageRequest,
  TokenRefresh,
  TokenRefreshRequest,
  VerifyCode,
  VerifyCodeRequest,
} from "./data-contracts";
import { fixtures } from "./fixtures";
import { ApiError, type RequestOptions } from "./http-client";

export class Auth {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * No description
   *
   * @tags auth
   * @name AuthCodeCreate
   * @request POST:/api/v1/auth/code/
   * @secure
   */
  authCodeCreate = async (
    data: RequestCodeRequest,
    opts?: RequestOptions,
  ): Promise<RequestCode> => {
    const response = await this.request.fetch(`/api/v1/auth/code/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
    return response.json();
  };

  /**
 * No description
 * @raw

 * @tags auth
 * @name AuthCodeCreate
 * @request POST:/api/v1/auth/code/
 * @secure
 */
  authCodeCreateRaw = (
    data: RequestCodeRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/code/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * @description Возвращает последний неиспользованный код для указанного email. Только для DEBUG.
   *
   * @tags auth
   * @name AuthCodeRetrieveCreate
   * @summary Получить код подтверждения (тест)
   * @request POST:/api/v1/auth/code/retrieve/
   * @secure
   */
  authCodeRetrieveCreate = async (
    data: RetrieveCodeRequest,
    opts?: RequestOptions,
  ): Promise<RetrieveCodeResponse> => {
    const response = await this.request.fetch(`/api/v1/auth/code/retrieve/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
    return response.json();
  };

  /**
 * @description Возвращает последний неиспользованный код для указанного email. Только для DEBUG.
 * @raw

 * @tags auth
 * @name AuthCodeRetrieveCreate
 * @summary Получить код подтверждения (тест)
 * @request POST:/api/v1/auth/code/retrieve/
 * @secure
 */
  authCodeRetrieveCreateRaw = (
    data: RetrieveCodeRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/code/retrieve/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthCodeVerifyCreate
   * @request POST:/api/v1/auth/code/verify/
   * @secure
   */
  authCodeVerifyCreate = async (
    data: VerifyCodeRequest,
    opts?: RequestOptions,
  ): Promise<VerifyCode> => {
    const response = await this.request.fetch(`/api/v1/auth/code/verify/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
    return response.json();
  };

  /**
 * No description
 * @raw

 * @tags auth
 * @name AuthCodeVerifyCreate
 * @request POST:/api/v1/auth/code/verify/
 * @secure
 */
  authCodeVerifyCreateRaw = (
    data: VerifyCodeRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/code/verify/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * @description Takes a token and blacklists it. Must be used with the `rest_framework_simplejwt.token_blacklist` app installed.
   *
   * @tags auth
   * @name AuthLogoutCreate
   * @request POST:/api/v1/auth/logout/
   */
  authLogoutCreate = async (
    data: TokenBlacklistRequest,
    opts?: RequestOptions,
  ): Promise<void> => {
    const response = await this.request.fetch(`/api/v1/auth/logout/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
  };

  /**
 * @description Takes a token and blacklists it. Must be used with the `rest_framework_simplejwt.token_blacklist` app installed.
 * @raw

 * @tags auth
 * @name AuthLogoutCreate
 * @request POST:/api/v1/auth/logout/
 */
  authLogoutCreateRaw = (
    data: TokenBlacklistRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/logout/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
   *
   * @tags auth
   * @name AuthTokenCreate
   * @request POST:/api/v1/auth/token/
   */
  authTokenCreate = async (
    data: TokenObtainPairWithProperMessageRequest,
    opts?: RequestOptions,
  ): Promise<TokenObtainPairWithProperMessage> => {
    const response = await this.request.fetch(`/api/v1/auth/token/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
    return response.json();
  };

  /**
 * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
 * @raw

 * @tags auth
 * @name AuthTokenCreate
 * @request POST:/api/v1/auth/token/
 */
  authTokenCreateRaw = (
    data: TokenObtainPairWithProperMessageRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/token/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
   *
   * @tags auth
   * @name AuthTokenRefreshCreate
   * @request POST:/api/v1/auth/token/refresh/
   */
  authTokenRefreshCreate = async (
    data: TokenRefreshRequest,
    opts?: RequestOptions,
  ): Promise<TokenRefresh> => {
    const response = await this.request.fetch(`/api/v1/auth/token/refresh/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
    return response.json();
  };

  /**
 * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
 * @raw

 * @tags auth
 * @name AuthTokenRefreshCreate
 * @request POST:/api/v1/auth/token/refresh/
 */
  authTokenRefreshCreateRaw = (
    data: TokenRefreshRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/auth/token/refresh/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
}

export const MockedauthCodeCreate = (
  body: RequestCode | null = fixtures.RequestCode,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/auth/code/`,
  method: "POST",
  body,
  status,
});
export const MockedauthCodeRetrieveCreate = (
  body: RetrieveCodeResponse | null = fixtures.RetrieveCodeResponse,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/auth/code/retrieve/`,
  method: "POST",
  body,
  status,
});
export const MockedauthCodeVerifyCreate = (
  body: VerifyCode | null = fixtures.VerifyCode,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/auth/code/verify/`,
  method: "POST",
  body,
  status,
});
export const MockedauthLogoutCreate = (status: number = 200): RouteConfig => ({
  url: `/api/v1/auth/logout/`,
  method: "POST",
  status,
});
export const MockedauthTokenCreate = (
  body: TokenObtainPairWithProperMessage | null = fixtures.TokenObtainPairWithProperMessage,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/auth/token/`,
  method: "POST",
  body,
  status,
});
export const MockedauthTokenRefreshCreate = (
  body: TokenRefresh | null = fixtures.TokenRefresh,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/auth/token/refresh/`,
  method: "POST",
  body,
  status,
});
