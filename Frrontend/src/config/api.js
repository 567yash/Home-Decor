let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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
