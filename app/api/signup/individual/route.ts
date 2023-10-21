import { connectToDB } from "@/utils/database";
import Student from "@/models/student";

async function create(model: any, payload: any) {
  const newRecord = new model({ ...payload });
  await newRecord.save();
}

export const POST = async (req: Request) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    course,
    employment_status,
    experience_level,
    computer_access,
    internet_access,
    use_workspace,
    signupType,
  } = await req.json();

  try {
    await connectToDB();

    let payload: any;
    
    if (signupType === "individual") {
      payload = { first_name, last_name, email, phone, course, employment_status, experience_level, computer_access, internet_access, use_workspace };

      await create(Student, payload);
    }

    return new Response(JSON.stringify(payload), { status: 201 });
  } catch (error) {
    return new Response("An error occured: " + error, { status: 500 });
  }
};