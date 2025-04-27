import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
// import GitHubProvider from "next-auth/providers/github";
// import YandexProvider from "next-auth/providers/yandex";
// import VkProvider from "next-auth/providers/vk";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      picture?: string;
    } & Omit<User, "id">;
  }
}

export const authConfig = {
  // debug: true, // только для разработки
  providers: [
//     YandexProvider({
//       clientId: process.env.YANDEX_CLIENT_ID,
//       clientSecret: process.env.YANDEX_CLIENT_SECRET
//     }),
//     GitHub,
    Google({
		clientId: process.env.AUTH_GOOGLE_ID as string,
		clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
	}),

  ],
  callbacks: {
    authorized(params) {
      console.log(params.auth)
      return !!params.auth?.user;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
