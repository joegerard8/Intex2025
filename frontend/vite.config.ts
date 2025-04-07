import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; " + // Everything not specifically listed must come from this origin (your own site)
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " +
        // Allow scripts from your site + inline/eval scripts (⚠️ less secure) + Google login scripts

        "style-src 'self' 'unsafe-inline' fonts.googleapis.com https://accounts.google.com; " +
        // Allow styles from your site + inline styles + Google Fonts + Google Login

        "img-src 'self' data:; " +
        // Images from your site and inline base64 (e.g., data URIs)

        "frame-ancestors 'none'; " +
        // Prevent your site from being embedded in an iframe — good for clickjacking protection

        "font-src 'self' fonts.gstatic.com data:; " +
        // Fonts can come from your site + Google Fonts CDN + inline base64

        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com; " +
        // Allow API calls or WebSocket connections to your server and Google OAuth

        "object-src 'none'; " +
        // Don't allow Flash or plugins (deprecated stuff)

        "base-uri 'self'; " +
        // Prevent someone from changing `<base>` tag to mess with relative URLs

        "form-action 'self'; " +
        // Forms can only be submitted to your site

        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
      // Allow iframes from your site + Google OAuth (for login popups)
    },
  },
});
