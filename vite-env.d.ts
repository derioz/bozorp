/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_VERCEL_PROJECT_ID: string
    readonly VITE_VERCEL_TOKEN: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
