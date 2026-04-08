import type { Core } from "@strapi/strapi";

const config = ({ env }: { env: any }): any => ({
  upload: {
    config: {
      security: {
        contentSecurityPolicy: {
          "allowed-types": [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
          ],
        },
      },
    },
  },
});

export default config;
