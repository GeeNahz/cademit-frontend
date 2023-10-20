import { connectToDB } from "@/utils/database";
import Profile from "@/models/profile";
import type { FormDataType } from "@/app/types";

export const POST = async (
  req: Request,
) => {
  try {
    await connectToDB();
    const data: FormDataType = await req.json();

    const emailExists = await Profile.findOne({ email: data.email });
    if (emailExists) return new Response("Email already in use.", { status: 409 });

    const newProfile = new Profile({ ...data });
    newProfile.save();

    return new Response(JSON.stringify(newProfile), { status: 201 });
  } catch (error) {
    return new Response("Failed to upload data.", { status: 500 });
  }
}
