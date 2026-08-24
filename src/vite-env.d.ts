/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROJECT_CONFIG_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
