import User from "@/models/user";

import { connectToDB } from "@/utils/database";

import { status } from "@/utils/status";
import { useHashPassword } from "@/app/hooks/keygen";

export const POST = async (req: Request) => {
  const { email, password, } = await req.json();

  try {
    await connectToDB();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return new Response("Email does not exist", { status: status.HTTP_404_NOT_FOUND });
    }

    user.hashed_password = useHashPassword(password);
    const updatedUser = await user.save();

    return new Response(JSON.stringify(updatedUser), { status: status.HTTP_200_OK });
  } catch (error) {
    return new Response("Server error " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};