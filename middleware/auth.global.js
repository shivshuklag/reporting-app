export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("accessToken").value;

  if (!token) {
    if (to.path !== "/signin" && to.path !== "/signup" ) {
      return navigateTo("/signin");
    }
    return; // Stop further execution to prevent loops
  }

  // Validate token
  const isValid = validateToken(token);

  if (!isValid) {
    if (to.path !== "/signin") {
      return navigateTo("/signin");
    }
    return;
  }

  if (to.path === "/signin" || to.path==="/signup") {
    return navigateTo("/dashboard");
  }
});

// Sample token validation function (replace with actual logic)
function validateToken(token) {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < decoded.exp * 1000;
  } catch (error) {
    return false;
  }
}
