import userSWR from 'swr'
import { UserResponse } from '@/types/user'

export const useCurrentUser = () => {
  return userSWR<UserResponse>('/users/me')
}