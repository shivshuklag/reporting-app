export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("accessToken").value;

  // Prevent redirect loop by checking if already on the target page
  if (!token) {
    if (to.path !== "/signin" && to.path !== "/signup") {
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

  // If logged in and trying to access "/signin", redirect to dashboard
  if (to.path === "/signin" || to.path.includes("/signup")) {
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
