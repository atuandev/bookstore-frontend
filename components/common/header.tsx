'use client'

import Link from 'next/link'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Logo } from '@/components/common/logo'
import { ModeToggle } from '@/components/common/mode-toggle'
import { Github } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="inset-x-0 top-0 z-40 bg-background backdrop-blur-[10px] shadow-sm saturate-100">
      <div className='w-full flex justify-center bg-[#d53927]'>
        <Image src="/images/Smallbanner.webp" alt="banner" width={1264} height={61} />
      </div>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 h-14">
        <Link href="/" aria-label="Home" title="Home">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <ModeToggle />

          <Tooltip>
            <TooltipTrigger>
              <Link
                href="https://github.com/atuandev"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <Github />
              </Link>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>
              <p>@atuandev</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

export { Header }