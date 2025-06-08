import { NextRequest,NextResponse } from "next/server";
import {db} from '@/db/index';
import {usersTable} from '@/db/schema';
import {eq} from "drizzle-orm"


export async function POST(request:NextRequest) {

    try {
         const {email,password}= await request.json();
         if(!email|| !password){
            return NextResponse.json(
                {error:"Email and password  are required"},
                {status:400}
            )
         }
       const existingUser = await db.select().from(usersTable).where(eq(usersTable.email,email));
      if(existingUser){
        return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
          );
       }
      await db.insert(usersTable).values({ email, password });

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