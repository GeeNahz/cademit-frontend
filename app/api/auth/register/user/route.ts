import { useHashPassword } from "@/app/hooks/keygen";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { status } from "@/utils/status";

import { createObject } from "@/utils/dbFunctions";

export const POST = async (req: Request) => {
  const credentials = await req.json();

  try {
    await connectToDB();

    // generate password hash
    const hashed_password = useHashPassword(credentials.password);    

    // create user
    const payload = {
      first_name: credentials.first_name || "",
      last_name: credentials.last_name || "",
      email: credentials.email.toLowerCase(),
      username: credentials.username.replace(" ", "").toLowerCase(),
      gender: credentials.gender,
      image: credentials.image || "",
      hashed_password,
      is_admin: credentials.is_admin || false,
    };

    const user = await createObject(User, payload);

    return new Response(JSON.stringify(user), { status: status.HTTP_201_CREATED });
  } catch (error: any) {
    if (error.message.includes("duplicate key error collection")) {
      let values = Object.keys(error.keyValue);
      let msg = "";
      msg = values.join(", ");
      msg += " already in use"
      return new Response(msg, { status: status.HTTP_409_CONFLICT });
    }
    
    if (error.message.includes("validation")) {
      const errors = error.errors;
      const errorKeys = Object.keys(errors);

      let messages = "";
      for (const err of errorKeys) {
        messages += "\n" + errors[err].properties.message;
      }
      return new Response(messages, { status: status.HTTP_400_BAD_REQUEST });
    }
    
    return new Response("We encountered a problem while submitting your data. Please try again later", { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
}
