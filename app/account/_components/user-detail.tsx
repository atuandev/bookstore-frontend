'use client'

import Image from 'next/image'
import { useCurrentUser } from '@/services/user'
import { useRouter } from 'next/navigation'

export function UserDetail() {
  const router = useRouter()
  const { data: userRes, error } = useCurrentUser()
  const currentUser = userRes?.data

  if (error) {
    router.push('/account/login')
  }

  if (!currentUser) return null

  return (
    <div className="flex items-center gap-4">
      <Image
        src={currentUser.avatar || '/images/default-avatar.svg'}
        alt={currentUser.name}
        className="w-8 h-8 rounded-full"
        width={32}
        height={32}
      />
      <div>
        <p className="text-sm text-gray-600">{currentUser.name}</p>
        <p className="text-xs text-gray-400">{currentUser.email}</p>
      </div>
    </div>
  )
}