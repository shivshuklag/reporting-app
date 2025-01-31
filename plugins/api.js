// plugins/api.js
import Cookies from "js-cookie";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const getAuthToken = () => {
    return Cookies.get("accessToken");
  };

  const apiCall = async (
    url,
    method = "GET",
    body = null,
    credentials = "same-origin"
  ) => {
    const token = getAuthToken();
    console.log({ token });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${apiBaseUrl}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      credentials,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  };

  // Inject the apiCall function into the app context
  nuxtApp.provide("apiCall", apiCall);
});
