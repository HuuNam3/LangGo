"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useState } from "react"
import { toast } from "sonner"

const enrollmentSchema = z.object({
  course_id: z.string(),
  enrolled_at: z.string(),
})

export default function AddEnrollmentForm({
  courseId,
  slug,
}: {
  courseId: string,
  slug: string
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof enrollmentSchema>>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      course_id: courseId,
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
        toast.success("đã đăng ký khóa học thành công")
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
            name="course_id"
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
