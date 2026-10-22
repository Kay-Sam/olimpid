import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const legacyRoutes = new Map([
  ["/about.html", "/about"],
  ["/programs.html", "/programs"],
  ["/destinations.html", "/destinations"],
  ["/contact.html", "/contact"],
]);
const cleanRoutes = new Set(["/about", "/programs", "/destinations", "/contact"]);

function createLegacyRedirectMiddleware() {
  return (request, response, next) => {
    if (!request.url) {
      next();
      return;
    }

    const url = new URL(request.url, "http://localhost");
    const destination = legacyRoutes.get(url.pathname);
    if (!destination) {
      next();
      return;
    }

    response.writeHead(301, { Location: `${destination}${url.search}` });
    response.end();
  };
}

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    {
      name: "clean-page-routes",
      configureServer(server) {
        server.middlewares.use(createLegacyRedirectMiddleware());
      },
      configurePreviewServer(server) {
        server.middlewares.use(createLegacyRedirectMiddleware());
        server.middlewares.use((request, _response, next) => {
          if (!request.url) {
            next();
            return;
          }
          const url = new URL(request.url, "http://localhost");
          if (cleanRoutes.has(url.pathname)) {
            request.url = `${url.pathname}/index.html${url.search}`;
          }
          next();
        });
      },
    },
  ],
});
