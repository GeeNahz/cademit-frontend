import Prospect from "@/models/prospects";
import { connectToDB } from "@/utils/database";

import { status } from "@/utils/status";


export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const prospects = await Prospect.find({});

    return new Response(JSON.stringify(prospects), { status: status.HTTP_200_OK });
  } catch (error) {
    return new Response("Server error " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};