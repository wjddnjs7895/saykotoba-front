import { ConfigContext } from "expo/config";

export default ({ config }: ConfigContext) => {
  const IS_DEV = process.env.APP_VARIANT === "development";

  require("dotenv").config({
    path: IS_DEV ? ".env.development" : ".env.production",
  });

  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
      isProduction: !IS_DEV,
    },
  };
};
