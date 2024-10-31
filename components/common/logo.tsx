'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" aria-label="Home" title="Home">
      <Image src="/images/fahasa-logo.webp" alt="Logo" width="200" height="0" />
    </Link>
  )
}
