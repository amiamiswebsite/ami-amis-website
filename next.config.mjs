const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES === "true" ? "/ami-amis-website" : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/ami-amis-website/" : "",
};

export default nextConfig;
