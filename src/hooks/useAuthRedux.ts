// hooks/useAuthRedux.ts
"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { setUser, clearUser, setLoading } from "@/store/authSlice"
import { useRouter } from "next/navigation"

export function useAuthRedux() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()
  const router = useRouter()

  const { user, isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (status === "loading") {
      dispatch(setLoading(true))
    } else if (status === "authenticated" && session?.user) {
      dispatch(setUser({
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        username: session.user.username,
        avatar: session.user.avatar,
        role: session.user.role,
      }))
    } else {
      dispatch(clearUser())
    }
  }, [status, session, dispatch])

  const login = () => signIn()
  const logout = () => {
    signOut({ callbackUrl: "/" })
    router.refresh()
  }

  return { user, isLoading, login, logout }
}
