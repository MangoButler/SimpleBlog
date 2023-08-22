import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "../../../helpers/db-utils";
import { validatePassword } from "../../../helpers/validators";
import { hashPassword, verifyPassword } from "../../../helpers/auth-utils";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(422).json({ message: "Invalid request" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  if (!newPassword || !oldPassword || !validatePassword(newPassword)) {
    res
      .status(422)
      .json({ message: "Please enter valid new and old passwords!" });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection timeout" });
    return;
  }

  const usersCollection = client.db().collection("users");

  let user;
  try {
    user = await usersCollection.findOne({ email: userEmail });
  } catch (error) {
    res.status(500).json({ message: "Connection timeout" });
    client.close();
    return;
  }

  if (!user) {
    res.status(401).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Wrong Password!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  let result;
  try {
    result = await usersCollection.updateOne(
        { email: userEmail },
        { $set: { password: hashedPassword } }
      );
  } catch (error) {
    res.status(500).json({ message: "Connection timeout" });
    client.close();
    return;
  }


  res.status(200).json({ message: "Successfully updated password" });

  client.close();
}

export default handler;
