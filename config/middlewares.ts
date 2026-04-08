import type { Core } from "@strapi/strapi";

const baseURL = process.env.API_BASE_URL;
const config: Core.Config.Middlewares = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          // This allows your frontend to actually see the images served by the backend
          "img-src": ["'self'", "data:", "blob:", "localhost:1337"],
          "media-src": ["'self'", "data:", "blob:", "localhost:1337"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      // Replace with your actual Vue app URL or ['*'] for testing
      origin: ["http://localhost:5173", baseURL],
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
        maxFileSize: 200 * 1024 * 1024, // 200MB limit for bundled uploads
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;
