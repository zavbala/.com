/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_EMAIL: string;
  readonly PUBLIC_USERNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
