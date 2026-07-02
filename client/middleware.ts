import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("TOKEN:", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/company",
    "/customer",
    "/inventory",
    "/sales",
    "/purchase",
    "/reports",
  ],
};