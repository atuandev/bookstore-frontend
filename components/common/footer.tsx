import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='mx-auto flex items-center max-w-7xl px-4 md:px-8 py-4 text-sm'>
      <span className='text-gray-600'>
        &copy; {new Date().getFullYear()} made by{' '}
      </span>
      <Link
        href='https://github.com/atuandev'
        target='_blank'
        className='ml-1 tracking-wide'
      >
        @atuandev
      </Link>
    </footer>
  )
}

export { Footer }
