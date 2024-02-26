import { CreateResponseType } from "../../../types/tt";
import {
  CREATE_NEW_TT,
  DELETE_TT,
  PUBLISH_TT,
  UPDATE_TT,
} from "../../tiny_thoughts/queries";
import { hygraphClient } from "../../lib/hygraph";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  if (session) {
    const body = await req.json();

    const responseCreate: CreateResponseType = await hygraphClient.request(
      CREATE_NEW_TT,
      {
        content: {
          children: body.content,
        },
      }
    );
    const responsePublish = await hygraphClient.request(PUBLISH_TT, {
      id: responseCreate.data.id,
    });

    return new NextResponse(JSON.stringify(responsePublish), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);

  if (session) {
    const body = await req.json();

    const responseDelete = await hygraphClient.request(DELETE_TT, {
      id: body.id,
    });

    return new NextResponse(JSON.stringify(responseDelete), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(options);

  if (session) {
    const body = await req.json();

    const responseUpdate: CreateResponseType = await hygraphClient.request(
      UPDATE_TT,
      {
        content: {
          children: body.content,
        },
        id: body.id,
      }
    );
    const responsePublish = await hygraphClient.request(PUBLISH_TT, {
      id: responseUpdate.data.id,
    });

    return new NextResponse(JSON.stringify(responsePublish), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
