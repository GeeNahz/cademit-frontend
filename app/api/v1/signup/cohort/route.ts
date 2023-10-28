import { connectToDB } from "@/utils/database";
import { status } from "@/utils/status";
import { ProspectsRecord } from "@/app/types";
import Prospect from "@/models/prospects";

async function create(model: any, payload: any) {
  const newRecord = new model({ ...payload });
  const createdRecord = await newRecord.save();
  return createdRecord;
}

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
  } = await req.json();

  try {
    await connectToDB();

    const emailExists = await Prospect.findOne({ email });

    if (emailExists) {
      return new Response("Email already in use", { status: status.HTTP_409_CONFLICT });
    } else {
      const payload: ProspectsRecord = { first_name, last_name, email, gender, phone, course, employment_status, experience_level, purpose, computer_access, internet_access, use_workspace };

      const prospect = await create(Prospect, payload);

      return new Response(JSON.stringify(prospect), { status: status.HTTP_201_CREATED });
    }
  } catch (error) {
    return new Response("An error occured: " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};