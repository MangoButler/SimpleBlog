import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "../../../helpers/db-utils";

export async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(422).json({ message: "Invalid request?" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(422).json({ message: "Not authenticated!" });
    return;
  }
  const userEmail = session.user.email;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection timeout!" });
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

  if (!user || user.isDeleted === 1) {
    res.status(401).json({ message: "User not found" });
    client.close();
    return;
  }

  let result;
  try {
    result = await usersCollection.updateOne(
        { email: userEmail },
        { $set: { isDeleted: 1 } }
      );
  } catch (error) {
    res.status(500).json({ message: "Connection timeout" });
    client.close();
    return;
  }

  res.status(200).json({ message: 'Successfully deleted account!'});
  client.close();


}

export default handler;
