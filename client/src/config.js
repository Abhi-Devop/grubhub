const isProduction = import.meta.env.MODE === 'production';

// In production (Vercel), interactions are same-origin (relative paths).
// In development, we point to the local Express server.
export const API_URL = isProduction ? 'https://grubhub-server-kappa.vercel.app' : 'http://localhost:5000';
