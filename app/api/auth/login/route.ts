import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/lib/secrets";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      {
        error: "Credentials not provided",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const token = jwt.sign({ username }, JWT_SECRET);

    return NextResponse.json({
      token: `Bearer ${token}`,
    });
  } catch {
    return NextResponse.json({
      error: "Some error occured signing the token",
    });
  }
}
