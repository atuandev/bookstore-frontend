'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <div className='w-[200px]'>
      <Link href="/" aria-label="Home" title="Home">
        <Image
          src="/images/fahasa-logo.webp"
          alt="Logo"
          sizes="100vw"
          className="w-full h-auto"
          width={120}
          height={40} />
      </Link>
    </div>
  )
}
