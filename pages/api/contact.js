import { validateEmail, validateMessage } from "../../helpers/validators";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body; //always validate server side
    if (
      !email ||
      !validateEmail(email) ||
      !name ||
      name.trim() === "" ||
      !message ||
      !validateMessage(message)
    ) {
      res
        .status(422)
        .json({ message: "Please enter valid email, name and message." });
      return;
    }
    //Store in Db
    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://christianhegi:nY0GE1QqBGx35ETk@reactcluster.d7gxulp.mongodb.net/portfolio-site?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }
    const db = client.db();
    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Message could not be received, please try again!" });
      client.close();
      return;
    }
    client.close();
    res
      .status(201)
      .json({ message: "Successfully stored message!", data: newMessage });
  }
}

export default handler;
