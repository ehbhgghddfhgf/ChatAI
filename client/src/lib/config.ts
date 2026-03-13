import { browser } from "./browser";

type RuntimeConfig = {
  VITE_COMPANY_NAME?: string;
  VITE_API_BASE_URL?: string;
};

function readRuntimeConfig(): RuntimeConfig {
  if (!browser || !window.__APP_CONFIG__) {
    return {};
  }

  return window.__APP_CONFIG__;
}

const runtimeConfig = readRuntimeConfig();

export const companyName =
  runtimeConfig.VITE_COMPANY_NAME || import.meta.env.VITE_COMPANY_NAME || "Perfect_03";

export const apiBaseUrl = (
  runtimeConfig.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  ""
).replace(/\/$/, "");
