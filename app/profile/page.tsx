"use client"
import { useAuthStore } from "@/store/authStore"
import LoginRequired from "../login/LoginRequired"

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user)

    if(!user) {
        return <LoginRequired />
    }
    return(
        <div>
            <h1>Profile Page</h1>
            <p>Email: {user.email}</p>
        </div>
    )
}
export default ProfilePage