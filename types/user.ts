export type User = {
  id: string
  username: string
  name: string
  email: string
  avatar: string
  status: boolean
  roles: Role[]
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export type Role = {
  name: string
  description: string
}

export type Address = {
  id: string
  receiverName: string
  receiverPhone: string
  address: string
}

export type UserResponse = {
  code: number
  message?: string
  data: User
}

export type ListUserResponse = {
  code: number
  message?: string
  data: User[]
}