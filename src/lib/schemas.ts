import * as z from "zod";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, { message: "Please enter a valid email or username" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    image: z.string(),
    bio: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const enrollmentSchema = z.object({
  user_id: z.string(),
  course_id: z.string(),
  enrolled_at: z.string(),
  progress: z.number().min(0),
});

export const courseCategorySchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
});

export const courseSchema = z.object({
  name: z.string().min(1, "Tên khóa học không được để trống"),
  instructor: z.string().min(1, "Giảng viên không được để trống"),
  course_categories_name: z.string().min(1, "Tên danh mục không được để trống"),
  duration: z.number().min(1, "Thời lượng không được để trống"),
  order: z.number().min(1, "Sắp xếp không được để trống"),
  thumbnail: z.string().min(1, "ảnh  không được để trống"),
  language: z.string().min(1, "Ngôn ngữ không được để trống"),
  studied: z
    .string()
    .min(1, "Học viên không được để trống")
    .refine((val) => !isNaN(Number(val)), "Học viên phải là số"),
  course_categories_id: z.string().min(1, "ID không được để trống"),
  slug: z.string().min(1, "Link bài học không được để trống"),
  level: z.string().min(1, "Trình độ không được để trống"),
});

export const courseIntroductionSchema = z.object({
  description: z.string().min(1, "Mô tả không được để trống"),
  prerequisites: z.string().min(1, "Điều kiện không được để trống"),
  you_learn: z.array(z.string()),
  course_id: z.string().min(1, "ID không được để trống"),
});

export const lessonSchema = z.object({
  name: z.string().min(1, "Tên bài học là bắt buộc"),
  course_id: z.string().min(1, "ID khóa học là bắt buộc"),
  order: z.number().min(1, "Thứ tự phải lớn hơn 0"),
});

export const lessonContentSchema = z.object({
  lesson_id: z.string().min(1, "ID bài học là bắt buộc"),
  content_type: z.string().min(1, "Loại nội dung là bắt buộc"),
  content_data: z.string().min(1, "Dữ liệu nội dung là bắt buộc"),
  order: z.number().min(1, "Thứ tự phải lớn hơn 0"),
});

export const userLessonProgressSchema = z.object({
  user_id: z.string().min(1, "ID bài học là bắt buộc"),
  course_id: z.string().min(1, "ID bài học là bắt buộc"),
  lesson_id: z.string().min(1, "ID bài học là bắt buộc"),
  status: z.string().min(1, "Chọn trạng thái bài học"),
  progress_percent: z.number().min(1, "tiến độ"),
});

export const videoContentSchema = z.object({
  lesson_id: z.string().min(1, "ID bài học là bắt buộc"),
  url: z.string().min(1, "URL video không được để "),
  duration: z.number().min(1, "Thời lượng phải lớn hơn 0"),
  subtitle: z.string(),
});

export const userAccountSchema = z.object({
  username: z.string(),
  email: z.string().email("Email không hợp lệ"),
  name: z.string().min(1, "Họ tên là bắt buộc"),
  role: z.string().min(1, "quyền là bắt buộc"),
  provider: z.string(),
  image: z.string(),
  bio: z.string(),
});

export const userInformationSchema = z.object({
  user_id: z.string().min(1, "ID người dùng là bắt buộc"),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
  birth_date: z.string().optional(),
});



export const schemas = {
  course_categories: courseCategorySchema,
  courses: courseSchema,
  course_introduction: courseIntroductionSchema,
  lessons: lessonSchema,
  user_accounts: userAccountSchema,
  user_information: userInformationSchema,
  lesson_contents: lessonContentSchema,
  video_contents: videoContentSchema,
  user_lesson_progress: userLessonProgressSchema,

};

export type CourseCategoryFormData = z.infer<typeof courseCategorySchema>;
export type CourseFormData = z.infer<typeof courseSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;
export type UserAccountFormData = z.infer<typeof userAccountSchema>;
export type UserInformationFormData = z.infer<typeof userInformationSchema>;
export type LessonContentFormData = z.infer<typeof lessonContentSchema>;
export type userLessonProgressFormData = z.infer<typeof userLessonProgressSchema>;
export type VideoContentFormData = z.infer<typeof videoContentSchema>;
export type CourseIntroductionFormData = z.infer<typeof courseIntroductionSchema>;
