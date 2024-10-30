import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/common/container'
import { Heading } from '@/components/common/heading'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <Container
      className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center rounded-lg shadow-sm gap-4">
      <Heading
        title="Next.js boilerplate"
        description="A boilerplate for Next.js with TypeScript, Tailwind CSS, and ESLint."
      />
      <Button variant="secondary">
        <Link href="" target="_blank" className="flex items-center gap-2">
          <SquareArrowOutUpRight className="size-4" />
          Source code
        </Link>
      </Button>
    </Container>
  )
}
