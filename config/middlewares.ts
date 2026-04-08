import type { Core } from "@strapi/strapi";

export default ({ env }: { env: any }): Core.Config.Middlewares => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          // Updated to be more flexible for production images
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "*.onrender.com",
            "tefs-photobooth-cms.onrender.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "*.onrender.com",
            "tefs-photobooth-cms.onrender.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:1337",
        "http://localhost:3000",
        "https://tefs-photobooth.vercel.app",
        env("API_BASE_URL", "https://tefs-photobooth.vercel.app"),
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb",
      jsonLimit: "256mb",
      textLimit: "256mb",
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
