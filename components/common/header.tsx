'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User } from 'lucide-react'

import { useCurrentUser } from '@/services/user'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { UserMenu } from '@/components/common/user-menu'
import { Logo } from '@/components/common/logo'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const Header = () => {
  const { data: userRes, error } = useCurrentUser()
  const currentUser = userRes?.data

  return (
    <header className="w-full bg-background backdrop-blur-[10px] shadow-sm saturate-100 z-40">
      <div className="w-full flex justify-center bg-[#d53927]">
        <Image src="/images/Smallbanner.webp" alt="banner" width={1264} height={61} priority />
      </div>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 py-4">
        <Logo />

        <div className="relative flex items-center justify-center gap-4">
          <Link href="/cart" className="flex flex-col items-center">
            <ShoppingCart className="text-gray-600" />
            <p className="text-sm text-gray-600">Giỏ hàng</p>
          </Link>

          {!error ? (
            <UserMenu user={currentUser} />
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <User className="text-gray-600" />
                  <p className="text-sm text-gray-600">Tài khoản</p>
                </div>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent
                  side="bottom"
                  align="end"
                  className="w-52 p-2 bg-white rounded-lg shadow-lg flex flex-col gap-2">
                  <Link href="/account/login">
                    <Button className="w-full">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/account/register">
                    <Button variant="outline" className="w-full">
                      Đăng ký
                    </Button>
                  </Link>
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header }