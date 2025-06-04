"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"

const enrollmentSchema = z.object({
  user_id: z.string(),
  course_id: z.string(),
  enrolled_at: z.string(),
  progress: z.number().min(0),
})

export default function AddEnrollmentForm({
  userId,
  courseId,
  slug,
}: {
  userId:string,
  courseId: string,
  slug: string
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof enrollmentSchema>>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      user_id: userId,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof enrollmentSchema>) => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/my-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        router.push(`/lessons/${slug}`)
      } else {
        console.error("Không thể ghi danh")
      }
    } catch (error) {
      console.error("Lỗi ghi danh:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="hidden">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enrolled_at"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Cần thiết nếu bạn muốn gọi form.submit() từ JS */}
          <button type="submit" className="hidden" id="enroll-submit-btn" />
        </form>
      </Form>

      {/* Nút bên ngoài để gửi form */}
      <Button
        onClick={() => form.handleSubmit(onSubmit)()}
        disabled={isLoading}
        className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
      >
        {isLoading ? "đang chuẩn bị bài học..." : "bắt đầu học"}
      </Button>
    </>
  )
}
