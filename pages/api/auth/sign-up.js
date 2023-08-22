import { hashPassword } from "../../../helpers/auth-utils";
import { connectToDatabase } from "../../../helpers/db-utils";
import { validatePassword, validateEmail } from "../../../helpers/validators";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(422).json({ message: "Invalid request!" });
    return;
  }
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    res.status(422).json({ message: "Invalid email or password!" });
    return;
  }
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection Timeout" });
    return;
  }
  const usersCollection = client.db().collection("users");
  const existingUser = await usersCollection.findOne({ email: email });

  if (existingUser && existingUser.isDeleted !== 1) {
    res.status(422).json({ message: "Email is already registered!" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  let result;
  try {
    if (existingUser) {
      result = await usersCollection.updateOne(
        { email: email },
        { $set: { password: hashedPassword, isDeleted: 0 } }
      );
    } else {
      result = await usersCollection.insertOne({
        email: email,
        password: hashedPassword,
        isDeleted: 0,
      });
    }

    res.status(201).json({ message: "Successfully created user" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong please try again." });
  }

  client.close();
}

export default handler;
