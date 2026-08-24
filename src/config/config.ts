/**
 * Application configuration
 */
export const config = {
  projectConfigPath: (import.meta.env.VITE_PROJECT_CONFIG_PATH as string) || '/data/projects.json',
  maxFileSize: 1024 * 1024, // 1MB
  parsingTimeout: 5000, // 5 seconds
} as const;
