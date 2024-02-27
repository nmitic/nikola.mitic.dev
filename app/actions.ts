"use server";

import { getServerSession } from "next-auth";
import {
  CREATE_NEW_TT,
  DELETE_TT,
  PUBLISH_TT,
  QUERY_ALL_TT,
  UPDATE_TT,
} from "./tiny_thoughts/queries";
import { options } from "./api/auth/[...nextauth]/options";
import { CreateResponseType, tinyThoughtsData } from "../types/tt";
import { hygraphClient } from "./lib/hygraph";
import { revalidatePath } from "next/cache";

export const getTinyThoughtsDataAction = async (
  first: number = 1,
  skip: number = 0,
  pathToRevalidate: string
) => {
  try {
    const response: tinyThoughtsData = await hygraphClient.request(
      QUERY_ALL_TT,
      {
        first,
        skip,
      }
    );

    revalidatePath(pathToRevalidate);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addNewTinyThoughtAction = async (
  content: any,
  pathToRevalidate: string
) => {
  const session = await getServerSession(options);

  if (session) {
    try {
      const responseCreate: CreateResponseType = await hygraphClient.request(
        CREATE_NEW_TT,
        {
          content: {
            children: content,
          },
        }
      );
      const responsePublish = await hygraphClient.request(PUBLISH_TT, {
        id: responseCreate.data.id,
      });

      revalidatePath(pathToRevalidate);
      return responsePublish;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("not authorized");
  }
};

export const updateTinyThoughtAction = async (
  content: any,
  id: string,
  pathToRevalidate: string
) => {
  const session = await getServerSession(options);

  if (session) {
    try {
      const responseUpdate: CreateResponseType = await hygraphClient.request(
        UPDATE_TT,
        {
          content: {
            children: content,
          },
          id,
        }
      );
      const responsePublish = await hygraphClient.request(PUBLISH_TT, {
        id: responseUpdate.data.id,
      });

      revalidatePath(pathToRevalidate);

      return responsePublish;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("not authorized");
  }
};

export const removeTinyThoughtAction = async (
  id: string,
  pathToRevalidate: string
) => {
  const session = await getServerSession(options);

  if (session) {
    try {
      const responseDelete = await hygraphClient.request(DELETE_TT, {
        id,
      });

      revalidatePath(pathToRevalidate);

      return responseDelete;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("not authorized");
  }
};
