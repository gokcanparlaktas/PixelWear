import md5 from "md5";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      // Simulating API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (
            [
              "customer@commerce.com",
              "store@commerce.com",
              "admin@commerce.com",
            ].includes(credentials.email) &&
            credentials.password === "123456"
          ) {
            resolve({
              success: true,
              user: {
                email: credentials.email,
                name: credentials.email.split("@")[0],
              },
            });
          } else {
            resolve({ success: false, message: "Invalid credentials" });
          }
        }, 1000);
      });

      if (response.success) {
        const gravatarUrl = getGravatarUrl();
        dispatch(loginSuccess({ ...response.user, gravatarUrl }));
        if (credentials.rememberMe) {
          localStorage.setItem("token", "dummy_token");
        }
        return { success: true };
      } else {
        dispatch(loginFailure(response.message));
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred. Please try again."));
      return {
        success: false,
        message: "An error occurred. Please try again.",
      };
    }
  };
};

const getGravatarUrl = () => {
  const email = "gokcanparlaktas@gmail.com";
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};
