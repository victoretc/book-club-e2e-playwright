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

export interface BookReview {
  id: number;
  club: number;
  user: User;
  /** Book Review */
  review: string;
  /**
   * @min 1
   * @max 5
   */
  assessment: number;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  readPages: number;
  /**
   * Дата создания
   * @format date-time
   */
  created: string;
  /**
   * Дата изменения
   * @format date-time
   */
  modified: string | null;
}

export interface BookReviewRequest {
  club: number;
  /**
   * Book Review
   * @minLength 1
   */
  review: string;
  /**
   * @min 1
   * @max 5
   */
  assessment: number;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  readPages: number;
}

export interface Club {
  id: number;
  /** @maxLength 255 */
  bookTitle: string;
  /** @maxLength 255 */
  bookAuthors: string;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  publicationYear: number;
  /** Book Description */
  description: string;
  /**
   * Link on Telegram chat
   * @format uri
   * @maxLength 200
   */
  telegramChatLink: string;
  owner: number;
  members: Member[];
  reviews: BookReview[];
  /**
   * Дата создания
   * @format date-time
   */
  created: string;
  /**
   * Дата изменения
   * @format date-time
   */
  modified: string | null;
}

export interface ClubRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  bookTitle: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  bookAuthors: string;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  publicationYear: number;
  /**
   * Book Description
   * @minLength 1
   */
  description: string;
  /**
   * Link on Telegram chat
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  telegramChatLink: string;
}

export interface Member {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /** @maxLength 150 */
  firstName?: string;
  /** @maxLength 150 */
  lastName?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface MemberRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /** @maxLength 150 */
  firstName?: string;
  /** @maxLength 150 */
  lastName?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface PaginatedBookReviewList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: BookReview[];
}

export interface PaginatedClubList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: Club[];
}

export interface PatchedBookReviewRequest {
  club?: number;
  /**
   * Book Review
   * @minLength 1
   */
  review?: string;
  /**
   * @min 1
   * @max 5
   */
  assessment?: number;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  readPages?: number;
}

export interface PatchedClubRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  bookTitle?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  bookAuthors?: string;
  /**
   * @min -2147483648
   * @max 2147483647
   */
  publicationYear?: number;
  /**
   * Book Description
   * @minLength 1
   */
  description?: string;
  /**
   * Link on Telegram chat
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  telegramChatLink?: string;
}

export interface PatchedUserRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /** @maxLength 150 */
  firstName?: string;
  /** @maxLength 150 */
  lastName?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface RequestCode {
  detail: string;
}

export interface RequestCodeRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface RetrieveCodeRequest {
  /**
   * Email адрес, на который был отправлен код
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface RetrieveCodeResponse {
  /**
   * 4-значный код подтверждения
   * @maxLength 4
   */
  code: string;
}

export interface TokenBlacklistRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface TokenObtainPairWithProperMessage {
  access: string;
  refresh: string;
}

export interface TokenObtainPairWithProperMessageRequest {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface TokenRefresh {
  access: string;
  refresh: string;
}

export interface TokenRefreshRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface User {
  id: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserRegister {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /** @maxLength 128 */
  password: string;
}

export interface UserRegisterRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface UserRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface VerifyCode {
  access: string;
  refresh: string;
}

export interface VerifyCodeRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @minLength 4
   * @maxLength 4
   */
  code: string;
}
