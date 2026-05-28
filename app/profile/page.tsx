"use client"
import { useAuthStore } from "@/store/authStore"

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user)

    if(!user) {
        return <div>Please login to view your profile</div>
    }
    return(
        <div>
            <h1>Profile Page</h1>
            <p>Email: {user.email}</p>
        </div>
    )
}
export default ProfilePage