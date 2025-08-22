import { nextServer } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";



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