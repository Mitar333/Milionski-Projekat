import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src/app", // folder sa root.tsx i routes.ts
  buildDirectory: "dist",
  ssr: false,
} satisfies Config;
