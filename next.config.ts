import type { NextConfig } from "next";

// Determine if the build is running in GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

let assetPrefix_config: string | undefined = undefined;
let basePath_config: string | undefined = undefined;

if (isGithubActions) {
  const repository = process.env.GITHUB_REPOSITORY; // Format: owner/repo
  if (repository) {
    const owner = repository.split("/")[0];
    const repoName = repository.split("/")[1];

    // Check if it's a user/organization page repository (e.g., username.github.io)
    // These are served from the root, so no basePath is needed.
    if (repoName.toLowerCase() !== `${owner.toLowerCase()}.github.io`) {
      // This is a project page, so a basePath is needed.
      // It should be /<repository-name>
      assetPrefix_config = `/${repoName}/`;
      basePath_config = `/${repoName}`;
    }
    // If it IS a user/org page (e.g., repoName is 'owner.github.io'),
    // basePath_config and assetPrefix_config remain undefined, so it's served from the root.
  }
}

const nextConfig: NextConfig = {
  output: "export", // For static site generation
  assetPrefix: assetPrefix_config,
  basePath: basePath_config,
  images: {
    unoptimized: true, // Disable image optimization for static export; important for GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
