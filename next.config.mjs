const nextConfig = {
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
