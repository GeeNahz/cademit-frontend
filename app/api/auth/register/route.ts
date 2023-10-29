import { useHashPassword } from "@/app/hooks/keygen";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { status } from "@/utils/status";

export const POST = async (req: Request) => {
  const credentials = await req.json();
  let newUser = {};

  try {
    await connectToDB();

    // Check for user with email
    const emailExists = await User.findOne({
      email: credentials?.email,
    });

    if (emailExists) {
      // raise conflict error if email exists
      return new Response("Email already exists", { status: status.HTTP_409_CONFLICT });
    } else {
      // generate password hash
      const hashed_password = useHashPassword(credentials.password);
      // create user
      newUser = await User.create({
        first_name: credentials?.first_name || "",
        last_name: credentials?.last_name || "",
        email: credentials?.email.toLowerCase(),
        username: credentials?.username.replace(" ", "").toLowerCase(),
        gender: credentials.gender,
        image: credentials.image || "",
        is_admin: credentials.is_admin || false,
        hashed_password,
      });
    }

    return new Response(JSON.stringify(newUser), { status: status.HTTP_201_CREATED });
  } catch (error) {
    return new Response("A server error occured.", { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
}
