import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "app/styles/generated/**",
    "test-results/**",
    "playwright-report/**",
  ]),
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);
