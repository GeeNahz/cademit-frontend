import { connectToDB } from "@/utils/database";
import Student from "@/models/student";
import { StudentRecord } from "@/app/types";

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
    employment_status,
    purpose,
    experience_level,
    computer_access,
    internet_access,
    use_workspace,
  } = await req.json();

  try {
    await connectToDB();
    
    const payload: StudentRecord = { first_name, last_name, email, phone, course, employment_status, experience_level, purpose, computer_access, internet_access, use_workspace };

    const student = await create(Student, payload);

    return new Response(JSON.stringify(student), { status: 201 });
  } catch (error) {
    return new Response("An error occured: " + error, { status: 500 });
  }
};