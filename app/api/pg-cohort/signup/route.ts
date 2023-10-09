import { connectToDB } from "@/utils/database";
import Profile from "@/models/profile";

export const POST = async (
  req: Request,
) => {
  try {
    await connectToDB();
    const data = await req.json();

    const newProfile = new Profile({ ...data });
    newProfile.save();

    return new Response(JSON.stringify(newProfile), { status: 201 });
  } catch (error) {
    return new Response("Failed to upload data.", { status: 500 });
  }
}
