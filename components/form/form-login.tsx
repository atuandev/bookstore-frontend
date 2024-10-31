'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { LoadingButton } from '@/components/ui/loading-button'

const LoginSchema = z.object({
  username: z.string().min(3, {
    message: 'Tên đăng nhập phải chứa ít nhất 3 ký tự',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  }),
})

export function FormLogin() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    console.log(data)
  }

  return (
    <div className="p-4 rounded-md min-w-[480px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSpending}
                      placeholder="Nhập username"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isSpending}
                      placeholder="Nhập password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal justify-end w-full text-gray-800"
            >
              <Link href="/account/login">Quên mật khẩu?</Link>
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <LoadingButton loading={isSpending} type="submit" className="w-full">
            Đăng nhập
          </LoadingButton>
          <Button
            size="sm"
            variant="link"
            asChild
            className="px-0 font-normal w-full text-gray-800"
          >
            <Link href="/account/register">Chưa có tài khoản? Đăng ký ngay</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}