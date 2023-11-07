import { APIResponse } from "@/app/types";
import Prospect from "@/models/prospects";
import { connectToDB } from "@/utils/database";

import { status } from "@/utils/status";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
  let searchParams = req.nextUrl.searchParams;
  let skip = searchParams.get("skip");
  let limit = searchParams.get("limit");
  let userId = searchParams.get("user-id");

  try {
    await connectToDB();
    const total = await Prospect.count();
    let prospects;
    if ((limit || skip) === "undefined") {
      prospects = await Prospect.find({});
    } else {
      prospects = await Prospect.find({}).skip(parseInt(skip as string)).limit(parseInt(limit as string));
    }

    const nextUrl = (limit: number, skip: number, total: number) => {
      if (limit + 10 > total) {
        let url = limit < total ? `/dashboard/${userId}/prospects?skip=${skip + 10}&limit=${limit + 10}` : null;
        return url;
      } else if (limit + 10 < total) {
        return `/dashboard/${userId}/prospects?skip=${skip + 10}&limit=${limit + 10}`;
      } else {
        return null;
      }
    };

    const previousUrl = (limit: number, skip: number) => {
      if (skip - 10 < 0) {
        let url = skip > 0 ? `/dashboard/${userId}/prospects?skip=${skip}&limit=${limit - 10}` : null;
        return url;
      } else if (skip - 10 >= 0) {
        return `/dashboard/${userId}/prospects?skip=${skip - 10}&limit=${limit - 10}`;
      } else {
        return null;
      }
    };

    let user = `/dashboard/${userId}/prospects?skip=0&limit=10`;
    const responseData: APIResponse = {
      count: total,
      statusText: "OK",
      status: status.HTTP_200_OK,
      links: {
        self: { href: `/dashboard/${userId}/prospects?skip=${skip}&limit=${limit}` },
        next: { href: nextUrl(parseInt(limit as string), parseInt(skip as string), total) },
        previous: { href: previousUrl(parseInt(limit as string), parseInt(skip as string)) },
      },
      results: prospects,
    };

    return new Response(JSON.stringify(responseData), { status: status.HTTP_200_OK });
  } catch (error) {
    return new Response("Server error " + error, { status: status.HTTP_500_INTERNAL_SERVER_ERROR });
  }
};