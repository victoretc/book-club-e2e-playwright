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
  PatchedUserRequest,
  User,
  UserRegister,
  UserRegisterRequest,
  UserRequest,
} from "./data-contracts";
import { fixtures } from "./fixtures";
import { ApiError, type RequestOptions } from "./http-client";

export class Users {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * No description
   *
   * @tags users
   * @name UsersMeRetrieve
   * @request GET:/api/v1/users/me/
   * @secure
   */
  usersMeRetrieve = async (opts?: RequestOptions): Promise<User> => {
    const response = await this.request.fetch(`/api/v1/users/me/`, {
      method: "GET",
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

 * @tags users
 * @name UsersMeRetrieve
 * @request GET:/api/v1/users/me/
 * @secure
 */
  usersMeRetrieveRaw = (opts?: RequestOptions): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/users/me/`, {
      method: "GET",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersMeUpdate
   * @request PUT:/api/v1/users/me/
   * @secure
   */
  usersMeUpdate = async (
    data: UserRequest,
    opts?: RequestOptions,
  ): Promise<User> => {
    const response = await this.request.fetch(`/api/v1/users/me/`, {
      method: "PUT",
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

 * @tags users
 * @name UsersMeUpdate
 * @request PUT:/api/v1/users/me/
 * @secure
 */
  usersMeUpdateRaw = (
    data: UserRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/users/me/`, {
      method: "PUT",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersMePartialUpdate
   * @request PATCH:/api/v1/users/me/
   * @secure
   */
  usersMePartialUpdate = async (
    data: PatchedUserRequest,
    opts?: RequestOptions,
  ): Promise<User> => {
    const response = await this.request.fetch(`/api/v1/users/me/`, {
      method: "PATCH",
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

 * @tags users
 * @name UsersMePartialUpdate
 * @request PATCH:/api/v1/users/me/
 * @secure
 */
  usersMePartialUpdateRaw = (
    data: PatchedUserRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/users/me/`, {
      method: "PATCH",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersMeDestroy
   * @request DELETE:/api/v1/users/me/
   * @secure
   */
  usersMeDestroy = async (opts?: RequestOptions): Promise<void> => {
    const response = await this.request.fetch(`/api/v1/users/me/`, {
      method: "DELETE",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
  };

  /**
 * No description
 * @raw

 * @tags users
 * @name UsersMeDestroy
 * @request DELETE:/api/v1/users/me/
 * @secure
 */
  usersMeDestroyRaw = (opts?: RequestOptions): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/users/me/`, {
      method: "DELETE",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags users
   * @name UsersRegisterCreate
   * @request POST:/api/v1/users/register/
   * @secure
   */
  usersRegisterCreate = async (
    data: UserRegisterRequest,
    opts?: RequestOptions,
  ): Promise<UserRegister> => {
    const response = await this.request.fetch(`/api/v1/users/register/`, {
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

 * @tags users
 * @name UsersRegisterCreate
 * @request POST:/api/v1/users/register/
 * @secure
 */
  usersRegisterCreateRaw = (
    data: UserRegisterRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/users/register/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
}

export const MockedusersMeRetrieve = (
  body: User | null = fixtures.User,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/users/me/`,
  method: "GET",
  body,
  status,
});
export const MockedusersMeUpdate = (
  body: User | null = fixtures.User,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/users/me/`,
  method: "PUT",
  body,
  status,
});
export const MockedusersMePartialUpdate = (
  body: User | null = fixtures.User,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/users/me/`,
  method: "PATCH",
  body,
  status,
});
export const MockedusersMeDestroy = (status: number = 204): RouteConfig => ({
  url: `/api/v1/users/me/`,
  method: "DELETE",
  status,
});
export const MockedusersRegisterCreate = (
  body: UserRegister | null = fixtures.UserRegister,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/users/register/`,
  method: "POST",
  body,
  status,
});
