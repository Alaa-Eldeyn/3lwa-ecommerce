// import { type AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           firstName: profile.given_name || "",
//           lastName: profile.family_name || "",
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//       profile(profile) {
//         const nameParts = profile.name ? profile.name.split(" ") : ["", ""];
//         const firstName = nameParts[0] || "";
//         const lastName =
//           nameParts.length > 1 ? nameParts.slice(1).join(" ") : "User";

//         return {
//           id: profile.id,
//           name: profile.name,
//           firstName: firstName,
//           lastName: lastName,
//           email: profile.email,
//           image: profile.picture?.data?.url,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 1 * 24 * 60 * 60, // 1 day
//   },
//   callbacks: {
//     async jwt({ token, account, user }) {
//       // حفظ الـ Token من الـ account حسب نوع الـ provider
//       if (account) {
//         token.providerId = account.providerAccountId;
//         token.provider = account.provider;
//         token.accessToken = account.access_token; // Access token
        
//         // Google يعطي ID Token، Facebook يعطي Access Token فقط
//         if (account.provider === 'google') {
//           token.idToken = account.id_token; // ID token للـ Google
//         } else if (account.provider === 'facebook') {
//           token.idToken = account.access_token; // Facebook: نستخدم Access Token بدلاً من ID Token
//         }
//       }
      
//       if (user) {
//         token.firstName = (user as any).firstName || "";
//         token.lastName = (user as any).lastName || "";

//         if (!token.firstName && !token.lastName && user.name) {
//           const nameParts = user.name.split(" ");
//           token.firstName = nameParts[0] || "";
//           token.lastName =
//             nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.providerId = token.providerId;
//       session.provider = token.provider;
//       session.accessToken = token.accessToken; // إضافة Access Token للـ session
//       session.idToken = token.idToken; // للـ Google: ID Token، للـ Facebook: Access Token

//       if (!session.user) session.user = {};
//       session.user.firstName = token.firstName || "";
//       session.user.lastName = token.lastName || "";

//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET as string,
// };