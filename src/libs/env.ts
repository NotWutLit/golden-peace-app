// API Configuration for different environments
const DEV_API_URL = 'https://sunny-utterly-shrimp.ngrok-free.app'
const PROD_API_URL = 'https://sunny-utterly-shrimp.ngrok-free.app' // Update this when you have HTTPS in production

export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL

// Timeout configurations
export const API_TIMEOUT = 15000 // 15 seconds
export const MUSIC_GENERATION_TIMEOUT = 360000 // 3 minutes for AI music generation

// For debugging API calls in development
export const DEBUG_API = __DEV__

// Alternative: If your server supports HTTPS, use this instead
// export const API_BASE_URL = 'https://194.233.67.229:3000'
