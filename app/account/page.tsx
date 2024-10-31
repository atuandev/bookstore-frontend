import { Container } from '@/components/common/container'
import { Heading } from '@/components/common/heading'

export default function AccountPage() {
  return (
    <Container
      className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center rounded-lg shadow-sm gap-4">
      <Heading
        title="Account Page"
      />
    </Container>
  )
}
