// import { STORAGE_KEY } from '@chakra-ui/react';

import { serverSideTranslations } from "../serverSideTranslations";

import type { NameSpaceConfig } from "../serverSideTranslations";
import type { GenerateExtensionRequest, GenerateStaticRequest } from "./type";

// new version of @chakra-ui not export this variable
const STORAGE_KEY = "chakra-ui-color-mode";

export const withI18n: GenerateExtensionRequest<NameSpaceConfig> =
  (...nameSpace) =>
  async ({ locale }) => {
    const data = await serverSideTranslations(locale as string, [
      "common",
      // for i18n dayjs
      "format",
      ...nameSpace,
    ]);
    return data;
  };
export const withI18nStatic: GenerateStaticRequest<NameSpaceConfig> = withI18n;

export const withColorCookie: GenerateExtensionRequest<never> =
  () =>
  ({ req }) => ({
    ["_colorModeCookie"]: ` ${STORAGE_KEY}=${req.cookies[`${STORAGE_KEY}`] === "dark" ? "dark" : "light"};`,
  });
export const withColorCookieStatic: GenerateStaticRequest<never> = withColorCookie;
