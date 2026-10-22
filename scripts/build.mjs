import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { pageMetadata } from "../src/page-metadata.js";

const root = process.cwd();
const output = resolve(root, "dist");
const routes = Object.keys(pageMetadata);

await build();
await build({
  build: {
    ssr: resolve(root, "src/entry-server.jsx"),
    outDir: resolve(output, "server"),
    emptyOutDir: true,
  },
});

await cp(resolve(root, "assets"), resolve(output, "assets"), { recursive: true });
for (const file of ["google784e6d710c43ced3.html", "robots.txt"]) {
  await cp(resolve(root, file), resolve(output, file));
}

const serverEntry = await import(pathToFileURL(resolve(output, "server/entry-server.js")).href);
const shell = await readFile(resolve(output, "index.html"), "utf8");
const rootElement = '<div id="root"></div>';
if (!shell.includes(rootElement)) {
  throw new Error("Could not find the React root in the built document.");
}

function createDocument(route) {
  const metadata = pageMetadata[route];
  const canonical = `https://olimpid.com.ng${route === "/" ? "/" : route}`;
  const description = metadata.socialDescription ?? metadata.description;
  const markup = serverEntry.renderPage(route);
  const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return shell
    .replace(rootElement, `<div id="root">${markup}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(metadata.description)}${suffix}`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(metadata.title)}${suffix}`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(description)}${suffix}`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(canonical)}${suffix}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(metadata.title)}${suffix}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/i, (_, prefix, suffix) => `${prefix}${escapeHtml(description)}${suffix}`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
}

for (const route of routes) {
  const document = createDocument(route);
  if (route === "/") {
    await writeFile(resolve(output, "index.html"), document);
    continue;
  }

  const routeDirectory = resolve(output, route.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, "index.html"), document);
}

await rm(resolve(output, "server"), { recursive: true, force: true });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>https://olimpid.com.ng${route === "/" ? "/" : route}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(output, "sitemap.xml"), sitemap);
