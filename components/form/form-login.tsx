'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import axiosClient from '@/lib/axiosClient'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { LoadingButton } from '@/components/ui/loading-button'
import { LoginResponseSchemaType, LoginSchema, LoginSchemaType } from '@/schemas/auth/login'
import { setAccessToken } from '@/utils/local-storage'

export function FormLogin() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchemaType) => {
    startTransition(() => {
      axiosClient
        .post<LoginResponseSchemaType>('/auth/login', data)
        .then(res => {
          // Save accessToken to local storage
          const accessToken = res.data.data?.token
          setAccessToken(accessToken)

          setSuccess('Đăng nhập thành công')
          router.push('/')
        })
        .catch(error => {
          setError(error.message)
        })
    })
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
                    <PasswordInput {...field} disabled={isSpending} placeholder="Nhập password" />
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
