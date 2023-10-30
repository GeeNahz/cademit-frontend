import { connectToDB } from "@/utils/database";
import { status } from "@/utils/status";
import { ProspectRecord } from "@/app/types";
import Prospect from "@/models/prospects";

import { createObject } from "@/utils/dbFunctions";

export const POST = async (req: Request) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    course,
    gender,
    employment_status,
    purpose,
    experience_level,
    computer_access,
    internet_access,
    use_workspace,
    is_approved,
  } = await req.json();

  try {
    await connectToDB();

    const emailExists = await Prospect.findOne({ email });

    if (emailExists) {
      return new Response("Email already in use", { status: status.HTTP_409_CONFLICT });
    } else {
      const payload: ProspectRecord = { first_name, last_name, email, gender, phone, course, employment_status, experience_level, purpose, computer_access, internet_access, use_workspace, is_approved };

      const prospect = await createObject(Prospect, payload);

      return new Response(JSON.stringify(prospect), { status: status.HTTP_201_CREATED });
    }
  } catch (error) {
    return new Response("An error occured: " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};