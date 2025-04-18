// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const getLoginState = (req, loginOptions) => {
  return {
    returnTo: req.headers.get("referer"),
  };
};

export const GET = handleAuth({
  async login(req, res) {
    try {
      return await handleLogin(req, res, { getLoginState });
    } catch (err) {
      res.status(err.status ?? 500).end(err.message);
    }
  },
});
