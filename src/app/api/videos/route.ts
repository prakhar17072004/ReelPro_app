import { db } from "@/db"; // Adjust path if needed
import { videosTable } from "@/db/schema"; // Your Drizzle schema
import { authOptions } from "@/lib/auth";
import { error } from "console";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse ,NextRequest} from "next/server";

export async function GET() {
  try {
    const videos = await db
      .select()
      .from(videosTable)
      .orderBy(desc(videosTable.createdAt)) // Or uploadedAt

      if(!videos || videos.length===0 ){
        return NextResponse.json([],{status:200})
      }

    return NextResponse.json( videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

//post method 


export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls = true,
      width = 1080,
      height = 1920,
    } = body;

    // Optional: basic validation
    if (!title || !videoUrl||description||thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing  required fields" },
        { status: 400 }
      );
    }

    // Insert video into database
    const inserted = await db.insert(videosTable).values({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls,
      width,
      height,
    });

    return NextResponse.json(
      { message: "Video uploaded successfully", data: inserted },
      { status: 201 }
    );

  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

