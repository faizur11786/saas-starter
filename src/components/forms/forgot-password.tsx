'use client'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPassword, forgotSchema } from '@/schema/auth'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordAction } from '@/actions/auth/forgot-password'
import { toast } from 'sonner'
import { useCallback } from 'react'
import Link from 'next/link'

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const form = useForm<ForgotPassword>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordAction,
    onSuccess: () => {
      toast.success('Check your email for a link to reset your password.', {
        id: 'forgot-password',
      })
    },
    onError: (error) => {
      toast.error(error.message ?? 'Something went wrong', {
        id: 'forgot-password',
      })
    },
  })

  const onSubmit = useCallback(
    (data: ForgotPassword) => {
      toast.loading('Sending...', { id: 'forgot-password' })
      mutate(data)
    },
    [mutate],
  )

  return (
    <Form {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormDescription>We will send you a link to reset your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
          <Button type="button" variant="outline" className="w-full" disabled={isPending} asChild>
            <Link href="/sign-in">Back to login</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
