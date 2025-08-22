import { nextServer } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { NotesHttpResponse } from "./clientApi";



export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    }
  })
  return response.data
}

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  return response.data
}

export const fetchServerNotes = async (search: string, page: number, tag: string|undefined) => {
  const cookieStore = await cookies()
  const params = {
    ...(search  && { search }),
    page,
    perPage: 12,
    tag,
  }
  const headers = {
    Cookie: cookieStore.toString()
  }
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
    headers,
  })
  return response.data;
}