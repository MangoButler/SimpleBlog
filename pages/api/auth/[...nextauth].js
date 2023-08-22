import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../helpers/db-utils";
import { verifyPassword } from "../../../helpers/auth-utils";

export const authOptions = {
  secret: "theStoneisinthegarden",
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        let client;
        try {
          client = await connectToDatabase();
        } catch (error) {
          throw new Error("Connection timeout");
        }

        const usersCollection = client.db().collection("users");
        let user;
        try {
          user = await usersCollection.findOne({
            email: credentials.email,
          });
        } catch (error) {
          client.close();
          throw new Error("Connection timeout");
        }

        if (!user || user.isDeleted === 1) {
          client.close();
          throw new Error("Incorrect email or password");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect email or password");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
