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
import { ApiError, type RequestOptions } from "./http-client";

export class Docs {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
   *
   * @tags docs
   * @name DocsSchemaRetrieve
   * @request GET:/api/v1/docs/schema/
   * @secure
   */
  docsSchemaRetrieve = async (
    query?: {
      format?: "json" | "yaml";
      lang?:
        | "af"
        | "ar"
        | "ar-dz"
        | "ast"
        | "az"
        | "be"
        | "bg"
        | "bn"
        | "br"
        | "bs"
        | "ca"
        | "ckb"
        | "cs"
        | "cy"
        | "da"
        | "de"
        | "dsb"
        | "el"
        | "en"
        | "en-au"
        | "en-gb"
        | "eo"
        | "es"
        | "es-ar"
        | "es-co"
        | "es-mx"
        | "es-ni"
        | "es-ve"
        | "et"
        | "eu"
        | "fa"
        | "fi"
        | "fr"
        | "fy"
        | "ga"
        | "gd"
        | "gl"
        | "he"
        | "hi"
        | "hr"
        | "hsb"
        | "hu"
        | "hy"
        | "ia"
        | "id"
        | "ig"
        | "io"
        | "is"
        | "it"
        | "ja"
        | "ka"
        | "kab"
        | "kk"
        | "km"
        | "kn"
        | "ko"
        | "ky"
        | "lb"
        | "lt"
        | "lv"
        | "mk"
        | "ml"
        | "mn"
        | "mr"
        | "ms"
        | "my"
        | "nb"
        | "ne"
        | "nl"
        | "nn"
        | "os"
        | "pa"
        | "pl"
        | "pt"
        | "pt-br"
        | "ro"
        | "ru"
        | "sk"
        | "sl"
        | "sq"
        | "sr"
        | "sr-latn"
        | "sv"
        | "sw"
        | "ta"
        | "te"
        | "tg"
        | "th"
        | "tk"
        | "tr"
        | "tt"
        | "udm"
        | "ug"
        | "uk"
        | "ur"
        | "uz"
        | "vi"
        | "zh-hans"
        | "zh-hant";
    },
    opts?: RequestOptions,
  ): Promise<Record<string, any>> => {
    const response = await this.request.fetch(`/api/v1/docs/schema/`, {
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
 * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
 * @raw

 * @tags docs
 * @name DocsSchemaRetrieve
 * @request GET:/api/v1/docs/schema/
 * @secure
 */
  docsSchemaRetrieveRaw = (
    query?: {
      format?: "json" | "yaml";
      lang?:
        | "af"
        | "ar"
        | "ar-dz"
        | "ast"
        | "az"
        | "be"
        | "bg"
        | "bn"
        | "br"
        | "bs"
        | "ca"
        | "ckb"
        | "cs"
        | "cy"
        | "da"
        | "de"
        | "dsb"
        | "el"
        | "en"
        | "en-au"
        | "en-gb"
        | "eo"
        | "es"
        | "es-ar"
        | "es-co"
        | "es-mx"
        | "es-ni"
        | "es-ve"
        | "et"
        | "eu"
        | "fa"
        | "fi"
        | "fr"
        | "fy"
        | "ga"
        | "gd"
        | "gl"
        | "he"
        | "hi"
        | "hr"
        | "hsb"
        | "hu"
        | "hy"
        | "ia"
        | "id"
        | "ig"
        | "io"
        | "is"
        | "it"
        | "ja"
        | "ka"
        | "kab"
        | "kk"
        | "km"
        | "kn"
        | "ko"
        | "ky"
        | "lb"
        | "lt"
        | "lv"
        | "mk"
        | "ml"
        | "mn"
        | "mr"
        | "ms"
        | "my"
        | "nb"
        | "ne"
        | "nl"
        | "nn"
        | "os"
        | "pa"
        | "pl"
        | "pt"
        | "pt-br"
        | "ro"
        | "ru"
        | "sk"
        | "sl"
        | "sq"
        | "sr"
        | "sr-latn"
        | "sv"
        | "sw"
        | "ta"
        | "te"
        | "tg"
        | "th"
        | "tk"
        | "tr"
        | "tt"
        | "udm"
        | "ug"
        | "uk"
        | "ur"
        | "uz"
        | "vi"
        | "zh-hans"
        | "zh-hant";
    },
    opts?: RequestOptions,
  ): Promise<APIResponse> =>
    this.request.fetch(`/api/v1/docs/schema/`, {
      method: "GET",
      params: query,
      timeout: opts?.timeout,
      headers: opts?.headers,
    });
}

export const MockeddocsSchemaRetrieve = (
  body: Record<string, any> | null = null,
  status: number = 200,
): RouteConfig => ({
  url: `/api/v1/docs/schema/`,
  method: "GET",
  body,
  status,
});
