import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types/user'
import { removeAccessToken } from '@/utils/local-storage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type UserDetailProps = {
  user?: User
}

export function UserMenu({ user }: UserDetailProps) {
  const router = useRouter()

  if (!user) return

  const handleLogout = () => {
    removeAccessToken()
    router.push('/account/login')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-col items-center justify-center">
            <Avatar className="size-6">
              <AvatarImage src={user.avatar || '/images/default-avatar.svg'} />
            </Avatar>
            <p className="text-sm text-gray-600">Tài khoản</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Quản trị viên</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account">Thông tin cá nhân</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}