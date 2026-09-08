import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "../out");
const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : (process.env.PORT ?? 4173));
const basePath = (process.env.TEST_BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  "",
);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const hasBasePath = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`));
  const relative = (hasBasePath ? pathname.slice(basePath.length) : pathname) || "/";
  let file = resolve(root, `.${relative}`);
  if (!file.startsWith(`${root}${sep}`) && file !== root) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, "index.html");
  if (!existsSync(file) && !extname(file)) file = resolve(file, "index.html");
  if (!existsSync(file)) file = resolve(root, "404.html");

  const size = statSync(file).size;
  const headers = {
    "Content-Type": mime[extname(file)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
    "Accept-Ranges": "bytes",
  };
  const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
  if (range && !file.endsWith("404.html")) {
    const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
    if (start > end || start >= size || (!range[1] && !range[2])) {
      response.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` }).end();
      return;
    }
    response.writeHead(206, {
      ...headers,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": end - start + 1,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file, { start, end }).pipe(response);
    return;
  }
  response.writeHead(file.endsWith("404.html") ? 404 : 200, { ...headers, "Content-Length": size });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Static export available at http://127.0.0.1:${port}${basePath || "/"}`);
});
