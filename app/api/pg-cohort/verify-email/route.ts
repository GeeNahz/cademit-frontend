import { connectToDB } from "@/utils/database";
import Profile from "@/models/profile";
import type { FormDataType } from "@/app/types";

export const POST = async (
  req: Request,
) => {
  try {
    await connectToDB();
    const data: FormDataType = await req.json();

    let responseMessage = {
      message: "Email not found.",
      exists: false,
    };
    
    const emailExists = await Profile.findOne({ email: data.email });
    if (emailExists) {
      responseMessage.message = "Email found.";
      responseMessage.exists = true;
      return new Response(JSON.stringify(responseMessage), { status: 200 });
    }
    return new Response(JSON.stringify(responseMessage), { status: 200 });
  } catch (error) {
    return new Response("Failed to upload data.", { status: 500 });
  }
}
