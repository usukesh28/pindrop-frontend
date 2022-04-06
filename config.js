import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? 'http://www.plusifics.com:5243/api' : 'http://localhost:5243/api'
export const APP_NAME = publicRuntimeConfig.APP_NAME