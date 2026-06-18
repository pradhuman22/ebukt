import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP } from "better-auth/plugins";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import OtpVerificationEmail from "@/templates/otp-verification-email";
import { resend } from "./resend";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
      contact: {
        type: "string",
        required: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "edme <onboarding@resend.dev>",
          to: [email],
          subject: "edme- verify your email",
          react: OtpVerificationEmail({ email, otp }),
        });
      },
    }),
    admin(),
    nextCookies(),
  ],
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  trustedOrigins: ["http://localhost:3001"],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
