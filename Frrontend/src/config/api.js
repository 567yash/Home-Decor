let rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawBaseUrl) {
  // If running locally in development, default to localhost:5000
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    rawBaseUrl = "http://localhost:5000";
  } else {
    // In production (e.g. Vercel or Render), default to your live deployed backend
    rawBaseUrl = "https://home-decor-3.onrender.com";
  }
}

if (rawBaseUrl && !rawBaseUrl.startsWith("http://") && !rawBaseUrl.startsWith("https://")) {
  rawBaseUrl = `https://${rawBaseUrl}`;
}

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const API_ENDPOINTS = {
  user: `${API_BASE_URL}/user`,
  orders: `${API_BASE_URL}/orders`,
  favourites: `${API_BASE_URL}/favourites`,
  adminregister: `${API_BASE_URL}/adminregister`,
  cart: `${API_BASE_URL}/cart`,
  checkout: `${API_BASE_URL}/checkout`,
  furniture: `${API_BASE_URL}/furniturei`,
  furnituredesc: `${API_BASE_URL}/furnituredesc`,
  homedecor: `${API_BASE_URL}/homedecor`,
  homedecordesc: `${API_BASE_URL}/homedecordesc`,
  furnishings: `${API_BASE_URL}/furnishingsi`,
  furnishingsdesc: `${API_BASE_URL}/furnishingsdesc`,
  kitchen: `${API_BASE_URL}/kitchenimg`,
  kitchendesc: `${API_BASE_URL}/kitchendesc`,
  kitchendiningdesc: `${API_BASE_URL}/kitchendiningdesc`,
  sofas: `${API_BASE_URL}/sofas`,
  sofadesc: `${API_BASE_URL}/sofadesc`,
  sofasdesc: `${API_BASE_URL}/sofasdesc`,
  lamp: `${API_BASE_URL}/lampimg`,
  lampdesc: `${API_BASE_URL}/lampdesc`,
};

export default API_BASE_URL;
