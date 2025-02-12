'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPassword, resetSchema } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPasswordAction } from '@/actions/auth/reset-password'

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token || '',
    },
  })

  useEffect(() => {
    if (!token) {
      router.push('/forgot-password')
    }
  }, [token])

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordAction,
    onError: (error) => {
      toast.error(error.message || 'An error occurred during password reset', {
        id: 'reset-password',
      })
    },
    onSuccess: (data) => {
      toast.success('Password reset successful', { id: 'reset-password' })
      if (data.token) {
        router.push('/dashboard')
      }
    },
  })

  const onSubmit = useCallback(
    (data: ResetPassword) => {
      toast.loading('Resetting password...', { id: 'reset-password' })
      mutate(data)
    },
    [mutate],
  )

  return (
    <Form {...form}>
      <form className={cn(className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="● ● ● ● ● ● ● ● ●" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="● ● ● ● ● ● ● ● ●" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
