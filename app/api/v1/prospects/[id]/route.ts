import { Types } from "mongoose";

import Prospect from "@/models/prospects";
import { connectToDB } from "@/utils/database";

import { status } from "@/utils/status";


export const GET = async (req: Request, { params }: { params: Types.ObjectId}) => {
  try {
    await connectToDB();
    
    const prospect = await Prospect.findOne({
      _id: params.id,
    });
    if (prospect) {
      return new Response(JSON.stringify(prospect), { status: status.HTTP_200_OK });
    } else {
      return new Response("No record found with the provided id", { status: status.HTTP_404_NOT_FOUND });
    }
  } catch (error) {
    return new Response("Server error " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};