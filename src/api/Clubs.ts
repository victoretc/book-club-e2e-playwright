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
  BookReview,
  BookReviewRequest,
  Club,
  ClubRequest,
  PaginatedBookReviewList,
  PaginatedClubList,
  PatchedBookReviewRequest,
  PatchedClubRequest,
} from "./data-contracts";
import { ApiError, type RequestOptions } from "./http-client";

export class Clubs {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * No description
   *
   * @tags clubs
   * @name ClubsList
   * @request GET:/api/v1/clubs/
   * @secure
   */
  clubsList = async (
    query?: {
      membership?: string;
      /** A page number within the paginated result set. */
      page?: number;
      /** Number of results to return per page. */
      page_size?: number;
      search?: string;
    },
    opts?: RequestOptions,
  ): Promise<PaginatedClubList> => {
    const response = await this.request.fetch(`/api/v1/clubs/`, {
      method: "GET",
      params: query,
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

 * @tags clubs
 * @name ClubsList
 * @request GET:/api/v1/clubs/
 * @secure
 */
  clubsListRaw = (
    query?: {
      membership?: string;
      /** A page number within the paginated result set. */
      page?: number;
      /** Number of results to return per page. */
      page_size?: number;
      search?: string;
    },
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/`, {
      method: "GET",
      params: query,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsCreate
   * @request POST:/api/v1/clubs/
   * @secure
   */
  clubsCreate = async (
    data: ClubRequest,
    opts?: RequestOptions,
  ): Promise<Club> => {
    const response = await this.request.fetch(`/api/v1/clubs/`, {
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

 * @tags clubs
 * @name ClubsCreate
 * @request POST:/api/v1/clubs/
 * @secure
 */
  clubsCreateRaw = (
    data: ClubRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsRetrieve
   * @request GET:/api/v1/clubs/{id}/
   * @secure
   */
  clubsRetrieve = async (id: number, opts?: RequestOptions): Promise<Club> => {
    const response = await this.request.fetch(`/api/v1/clubs/${id}/`, {
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

 * @tags clubs
 * @name ClubsRetrieve
 * @request GET:/api/v1/clubs/{id}/
 * @secure
 */
  clubsRetrieveRaw = (
    id: number,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/`, {
      method: "GET",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsUpdate
   * @request PUT:/api/v1/clubs/{id}/
   * @secure
   */
  clubsUpdate = async (
    id: number,
    data: ClubRequest,
    opts?: RequestOptions,
  ): Promise<Club> => {
    const response = await this.request.fetch(`/api/v1/clubs/${id}/`, {
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

 * @tags clubs
 * @name ClubsUpdate
 * @request PUT:/api/v1/clubs/{id}/
 * @secure
 */
  clubsUpdateRaw = (
    id: number,
    data: ClubRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/`, {
      method: "PUT",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsPartialUpdate
   * @request PATCH:/api/v1/clubs/{id}/
   * @secure
   */
  clubsPartialUpdate = async (
    id: number,
    data: PatchedClubRequest,
    opts?: RequestOptions,
  ): Promise<Club> => {
    const response = await this.request.fetch(`/api/v1/clubs/${id}/`, {
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

 * @tags clubs
 * @name ClubsPartialUpdate
 * @request PATCH:/api/v1/clubs/{id}/
 * @secure
 */
  clubsPartialUpdateRaw = (
    id: number,
    data: PatchedClubRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/`, {
      method: "PATCH",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsDestroy
   * @request DELETE:/api/v1/clubs/{id}/
   * @secure
   */
  clubsDestroy = async (id: number, opts?: RequestOptions): Promise<void> => {
    const response = await this.request.fetch(`/api/v1/clubs/${id}/`, {
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

 * @tags clubs
 * @name ClubsDestroy
 * @request DELETE:/api/v1/clubs/{id}/
 * @secure
 */
  clubsDestroyRaw = (id: number, opts?: RequestOptions): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/`, {
      method: "DELETE",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsMembersMeCreate
   * @request POST:/api/v1/clubs/{id}/members/me/
   * @secure
   */
  clubsMembersMeCreate = async (
    id: number,
    opts?: RequestOptions,
  ): Promise<void> => {
    const response = await this.request.fetch(
      `/api/v1/clubs/${id}/members/me/`,
      {
        method: "POST",
        timeout: opts?.timeout,
        headers: opts?.headers,
      },
    );
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
  };

  /**
 * No description
 * @raw

 * @tags clubs
 * @name ClubsMembersMeCreate
 * @request POST:/api/v1/clubs/{id}/members/me/
 * @secure
 */
  clubsMembersMeCreateRaw = (
    id: number,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/members/me/`, {
      method: "POST",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsMembersMeDestroy
   * @request DELETE:/api/v1/clubs/{id}/members/me/
   * @secure
   */
  clubsMembersMeDestroy = async (
    id: number,
    opts?: RequestOptions,
  ): Promise<void> => {
    const response = await this.request.fetch(
      `/api/v1/clubs/${id}/members/me/`,
      {
        method: "DELETE",
        timeout: opts?.timeout,
        headers: opts?.headers,
      },
    );
    if (opts?.validateStatus !== false && response.status() >= 400) {
      throw new ApiError(response.status(), await response.text());
    }
  };

  /**
 * No description
 * @raw

 * @tags clubs
 * @name ClubsMembersMeDestroy
 * @request DELETE:/api/v1/clubs/{id}/members/me/
 * @secure
 */
  clubsMembersMeDestroyRaw = (
    id: number,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/${id}/members/me/`, {
      method: "DELETE",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsList
   * @request GET:/api/v1/clubs/reviews/
   * @secure
   */
  clubsReviewsList = async (
    query?: {
      club?: number;
      /** A page number within the paginated result set. */
      page?: number;
      /** Number of results to return per page. */
      page_size?: number;
    },
    opts?: RequestOptions,
  ): Promise<PaginatedBookReviewList> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/`, {
      method: "GET",
      params: query,
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

 * @tags clubs
 * @name ClubsReviewsList
 * @request GET:/api/v1/clubs/reviews/
 * @secure
 */
  clubsReviewsListRaw = (
    query?: {
      club?: number;
      /** A page number within the paginated result set. */
      page?: number;
      /** Number of results to return per page. */
      page_size?: number;
    },
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/`, {
      method: "GET",
      params: query,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsCreate
   * @request POST:/api/v1/clubs/reviews/
   * @secure
   */
  clubsReviewsCreate = async (
    data: BookReviewRequest,
    opts?: RequestOptions,
  ): Promise<BookReview> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/`, {
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

 * @tags clubs
 * @name ClubsReviewsCreate
 * @request POST:/api/v1/clubs/reviews/
 * @secure
 */
  clubsReviewsCreateRaw = (
    data: BookReviewRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/`, {
      method: "POST",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsRetrieve
   * @request GET:/api/v1/clubs/reviews/{id}/
   * @secure
   */
  clubsReviewsRetrieve = async (
    id: number,
    opts?: RequestOptions,
  ): Promise<BookReview> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
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

 * @tags clubs
 * @name ClubsReviewsRetrieve
 * @request GET:/api/v1/clubs/reviews/{id}/
 * @secure
 */
  clubsReviewsRetrieveRaw = (
    id: number,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
      method: "GET",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsUpdate
   * @request PUT:/api/v1/clubs/reviews/{id}/
   * @secure
   */
  clubsReviewsUpdate = async (
    id: number,
    data: BookReviewRequest,
    opts?: RequestOptions,
  ): Promise<BookReview> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
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

 * @tags clubs
 * @name ClubsReviewsUpdate
 * @request PUT:/api/v1/clubs/reviews/{id}/
 * @secure
 */
  clubsReviewsUpdateRaw = (
    id: number,
    data: BookReviewRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
      method: "PUT",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsPartialUpdate
   * @request PATCH:/api/v1/clubs/reviews/{id}/
   * @secure
   */
  clubsReviewsPartialUpdate = async (
    id: number,
    data: PatchedBookReviewRequest,
    opts?: RequestOptions,
  ): Promise<BookReview> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
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

 * @tags clubs
 * @name ClubsReviewsPartialUpdate
 * @request PATCH:/api/v1/clubs/reviews/{id}/
 * @secure
 */
  clubsReviewsPartialUpdateRaw = (
    id: number,
    data: PatchedBookReviewRequest,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
      method: "PATCH",
      data: data,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
  /**
   * No description
   *
   * @tags clubs
   * @name ClubsReviewsDestroy
   * @request DELETE:/api/v1/clubs/reviews/{id}/
   * @secure
   */
  clubsReviewsDestroy = async (
    id: number,
    opts?: RequestOptions,
  ): Promise<void> => {
    const response = await this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
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

 * @tags clubs
 * @name ClubsReviewsDestroy
 * @request DELETE:/api/v1/clubs/reviews/{id}/
 * @secure
 */
  clubsReviewsDestroyRaw = (
    id: number,
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/clubs/reviews/${id}/`, {
      method: "DELETE",
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
}

export const MockedclubsList = (
  body: PaginatedClubList | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/`,
  method: "GET",
  body,
});
export const MockedclubsCreate = (body: Club | null = null): RouteConfig => ({
  url: `/api/v1/clubs/`,
  method: "POST",
  body,
});
export const MockedclubsRetrieve = (
  id: number,
  body: Club | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/${id}/`,
  method: "GET",
  body,
});
export const MockedclubsUpdate = (
  id: number,
  body: Club | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/${id}/`,
  method: "PUT",
  body,
});
export const MockedclubsPartialUpdate = (
  id: number,
  body: Club | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/${id}/`,
  method: "PATCH",
  body,
});
export const MockedclubsDestroy = (id: number): RouteConfig => ({
  url: `/api/v1/clubs/${id}/`,
  method: "DELETE",
});
export const MockedclubsMembersMeCreate = (id: number): RouteConfig => ({
  url: `/api/v1/clubs/${id}/members/me/`,
  method: "POST",
});
export const MockedclubsMembersMeDestroy = (id: number): RouteConfig => ({
  url: `/api/v1/clubs/${id}/members/me/`,
  method: "DELETE",
});
export const MockedclubsReviewsList = (
  body: PaginatedBookReviewList | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/reviews/`,
  method: "GET",
  body,
});
export const MockedclubsReviewsCreate = (
  body: BookReview | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/reviews/`,
  method: "POST",
  body,
});
export const MockedclubsReviewsRetrieve = (
  id: number,
  body: BookReview | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/reviews/${id}/`,
  method: "GET",
  body,
});
export const MockedclubsReviewsUpdate = (
  id: number,
  body: BookReview | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/reviews/${id}/`,
  method: "PUT",
  body,
});
export const MockedclubsReviewsPartialUpdate = (
  id: number,
  body: BookReview | null = null,
): RouteConfig => ({
  url: `/api/v1/clubs/reviews/${id}/`,
  method: "PATCH",
  body,
});
export const MockedclubsReviewsDestroy = (id: number): RouteConfig => ({
  url: `/api/v1/clubs/reviews/${id}/`,
  method: "DELETE",
});
