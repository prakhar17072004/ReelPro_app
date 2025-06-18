import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/index";
import { usersTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password  are required" },
        { status: 400 }
      );
    }
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser.length >0 ) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    //hashed the password
    const hashedPassword = await bcrypt.hash(password, 10); 
    await db.insert(usersTable).values({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: " fail to  register User successfully" },
      { status: 500 }
    );
  }
}
