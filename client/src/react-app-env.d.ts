/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string
        REACT_APP_API_BASE_URL: string
        REACT_APP_CLIENT_BASE_URL: string
    }
}
