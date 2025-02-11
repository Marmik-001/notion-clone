import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";
// import { log } from "console";

export async function POST(req: NextRequest) {
  await auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const session = liveblocks.prepareSession(sessionClaims?.email!, {
    userInfo: {
      name: sessionClaims?.fullName!,
      email: sessionClaims?.email!,
      avatar: sessionClaims?.image!,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();
  // in a room among all users, find the user whose id is the same as the current user
  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    console.log('you are authorized here the body:', body);
    
    return new Response(body, { status: status });
  } else {
    return NextResponse.json(
      {
        message: "You are not allowed to access this room",
      },
      {
        status: 403,
      }
    );
  }
}
