import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@ffprobe-installer/ffprobe",
    "fluent-ffmpeg"
  ],
};

export default nextConfig;
