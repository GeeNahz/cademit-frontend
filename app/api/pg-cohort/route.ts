import { connectToDB } from "@/utils/database";
import Profile from "@/models/profile";

export const GET = async (res: Request) => {
  try {
    await connectToDB()

    let profiles = await Profile.find();

    return new Response(JSON.stringify(profiles), { status: 200 });
  } catch (error) {
    return new Response("Unable to retrieve profiles.", { status: 500 });
  }
}