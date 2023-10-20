import { connectToDB } from "@/utils/database";
import Student from "@/models/student";

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

    const payload = { first_name, last_name, email, phone, course, employment_status, experience_level, computer_access, internet_access, use_workspace };

    const student = new Student({ ...payload });
    student.save();

    return new Response(JSON.stringify(payload), { status: 201 });
  } catch (error) {
    return new Response("An error occured: " + error, { status: 500 });
  }
};