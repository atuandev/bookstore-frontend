'use client'

import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { LoadingButton } from '@/components/ui/loading-button'
import { PasswordInput } from '@/components/ui/password-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên không được để trống',
  }),
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  username: z.string().min(3, {
    message: 'Tên đăng nhập phải chứa ít nhất 3 ký tự',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  }),
})

export function FormRegister() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    console.log(data)
  }

  return (
    <div className="p-4 rounded-md min-w-[480px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSpending}
                      placeholder="Nhập tên"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSpending}
                      placeholder="Nhập email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <LoadingButton loading={isSpending} type="submit" className="w-full">
            Đăng ký
          </LoadingButton>
          <Button
            size="sm"
            variant="link"
            asChild
            className="px-0 font-normal w-full text-gray-800"
          >
            <Link href="/account/login">Đã có tài khoản? Đăng nhập ngay</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}