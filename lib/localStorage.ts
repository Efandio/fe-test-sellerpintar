
import type { UsersType } from "@/types/UserType"


// add users, get datas from register form
export const setUser = (user: UsersType[]) => {
    localStorage.setItem('users', JSON.stringify(user) || '[]');
};

export const removeUser = () => {
    localStorage.removeItem('users')
}