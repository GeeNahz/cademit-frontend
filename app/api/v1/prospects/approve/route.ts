import { Types } from "mongoose";

import Prospect from "@/models/prospects";
import { connectToDB } from "@/utils/database";

import { status } from "@/utils/status";


export const POST = async (req: Request) => {
  const { id, is_approved } = await req.json();
  try {
    await connectToDB();

    const prospect = await Prospect.findOne({
      _id: id,
    });

    if (prospect) {
      prospect.is_approved = is_approved;
      const updatedProspect = await prospect.save();

      return new Response(JSON.stringify(updatedProspect), { status: status.HTTP_200_OK });
    } else {
      return new Response("No record found with the provided id", { status: status.HTTP_404_NOT_FOUND });
    }
  } catch (error) {
    return new Response("Server error " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};
