export type UserRole = "student" | "instructor" | "admin";
export type Gender = "male" | "female" | "other";
export type progress = "in_progress" | "completed";
export interface IUserAccounts {
  _id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  bio?: string;
  image?: string;
  joined: Date;
  role: UserRole;
  createdAt: Date;
}

// export interface IUserInformation {
//   _id: string;
//   userId: string;
//   name: string;
//   avatarUrl?: string;
//   bio?: string;
//   joined: Date;
//   birthday?: Date;
//   gender?: Gender;
//   phoneNumber?: string;
//   country?: string;
//   createdAt: Date;
//   updatedAt?: Date;
// }

export interface IIntroduction {
  _id: string;
  description: string;
  you_learn: string[];
  prerequisites: string;
  courses_id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICourse {
  _id: string;
  name: string;
  thumbnail: string;
  studied: string;
  // instructor: IAccountUser;
  instructor: string;
  language: string;
  duration: number;
  level: string;
  introduction: IIntroduction;
  category: string;
  slug: string;
  course_categories_name: string;
  order: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson {
  _id: string;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILessonContent {
  _id: string;
  lesson_id: string;
  type: "video" | "text" | "quiz" | "audio";
  content_id: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMyCourses {
  _id: string;
  user_id: string;
  course_id: string;
  course: ICourse;
  enrolled_at: Date;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
}

export interface ICourseCatygory {
  _id: string;
  title: string;
  description: string;
  courses: ICourse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILessonVideos {
  _id: string;
  url: string;
  title: string;
  durations: number;
  lesson_id: string;
  subtitle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLessonProgress {
  _id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  status: progress;
  progress_percent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection<
  T extends keyof CollectionFormValuesMap = keyof CollectionFormValuesMap
> {
  name: T;
  displayName: string;
  fields: Array<{
    key: string;
    label: string;
    type:
      | "text"
      | "textarea"
      | "date"
      | "email"
      | "number"
      | "combobox"
      | "array";
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    searchable?: boolean;
    allowCustom?: boolean;
  }>;
}
// ----------------------------------------------------------------------------------------------------------
// Collection

export const collections: Collection[] = [
  {
    name: "course_categories",
    displayName: "Danh mục khóa học",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text", required: true },
      { key: "description", label: "Mô tả", type: "textarea", required: true },
    ],
  },
  {
    name: "courses",
    displayName: "Khóa học",
    fields: [
      { key: "name", label: "Tên khóa học", type: "text", required: true },
      {
        key: "instructor",
        label: "Giảng viên",
        type: "text",
        required: true,
      },
      {
        key: "course_categories_name",
        label: "Tên danh mục",
        type: "text",
        required: true,
      },
      {
        key: "duration",
        label: "Thời lượng (giờ)",
        type: "number",
        required: true,
      },
      { key: "order", label: "Sắp xếp", type: "number", required: true },
      { key: "thumbnail", label: "Ảnh nền", type: "text", required: true },
      { key: "language", label: "Ngôn ngữ", type: "text", required: true },
      { key: "studied", label: "Học viên ", type: "text", required: true },
      {
        key: "course_categories_id",
        label: "id categories",
        type: "text",
        required: true,
      },
      { key: "slug", label: "link bài học", type: "text", required: true },
      { key: "level", label: "Trình độ", type: "text", required: true },
    ],
  },
  {
    name: "course_introduction",
    displayName: "Giới thiệu khóa học",
    fields: [
      { key: "description", label: "Mô tả", type: "textarea", required: true },
      {
        key: "prerequisites",
        label: "Điều kiện để học",
        type: "textarea",
        required: true,
      },
      {
        key: "you_learn",
        label: "Nhận được gì sao khóa học",
        type: "array",
      },
      {
        key: "course_id",
        label: "course id",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "lessons",
    displayName: "Bài học",
    fields: [
      { key: "name", label: "Tên bài học", type: "text", required: true },
      { key: "order", label: "sắp xếp", type: "number", required: true },
      { key: "course_id", label: "ID khóa học", type: "text", required: true },
    ],
  },
  {
    name: "lesson_contents",
    displayName: "Nội dung bài học",
    fields: [
      { key: "lesson_id", label: "ID bài học", type: "text", required: true },
      {
        key: "content_type",
        label: "Loại nội dung",
        type: "text",
        required: true,
      },
      {
        key: "content_data",
        label: "Dữ liệu nội dung",
        type: "textarea",
        required: true,
      },
      { key: "order", label: "Thứ tự", type: "number", required: true },
    ],
  },
  {
    name: "user_lesson_progress",
    displayName: "tiến độ bài học của user",
    fields: [
      { key: "user_id", label: "ID user", type: "text", required: true },
      { key: "course_id", label: "ID khóa học", type: "text", required: true },
      { key: "lesson_id", label: "ID bài học", type: "text", required: true },
      { key: "current_step", label: "Bước học đang học", type: "number", required: true },
      { key: "completed_steps", label: "Bước học đã hoàn thành", type: "array", required: true },
      {
        key: "status",
        label: "Trạng thái",
        type: "text",
        required: true,
        // options: [
        //   {
        //     value: "in_progress",
        //     label: "đang học",
        //   },
        //   {
        //     value: "completed",
        //     label: "hoành thành",
        //   },
        // ],
      },
    ],
  },
  {
    name: "video_contents",
    displayName: "Nội dung video",
    fields: [
      { key: "lesson_id", label: "ID bài học", type: "text", required: true },
      { key: "url", label: "URL video", type: "text", required: true },
      {
        key: "duration",
        label: "Thời lượng (giây)",
        type: "number",
        required: true,
      },
      { key: "subtitle", label: "Mô tả", type: "text" },
    ],
  },
  {
    name: "user_courses",
    displayName: "Người dùng đăng ký khóa học",
    fields: [
      { key: "user_id", label: "ID người dùng", type: "text", required: true },
      { key: "course_id", label: "ID khóa học", type: "text", required: true },
    ],
  },
  {
    name: "user_accounts",
    displayName: "Tài khoản người dùng",
    fields: [
      { key: "username", label: "Tên đăng nhập", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "name", label: "Họ tên", type: "text", required: true },
      { key: "image", label: "ảnh đại diện", type: "text", required: true },
      { key: "role", label: "quyền", type: "text", required: true },
      { key: "provider", label: "đăng nhập", type: "text", required: true },
      { key: "bio", label: "Tiểu sử", type: "textarea" },
    ],
  },
] as const;

export interface DatabaseRecord {
  _id: string;
  [key: string]: FieldValueType;
}

export interface CollectionField {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "date"
    | "email"
    | "number"
    | "combobox"
    | "array";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  searchable?: boolean;
  allowCustom?: boolean;
}

// -------------------------------------------------------------------------------------------------------------------------
// component
export type FieldValueType = string | number | null;

// Create a mapping from collection names to their form value types
export type CollectionFormValuesMap = {
  course_categories: {
    title: string;
    description: string;
  };
  courses: {
    name: string;
    instructor: string;
    course_categories_name: string;
    duration: number;
    order: number;
    thumbnail: string;
    language: string;
    studied: string;
    course_categories_id: string;
    slug: string;
    level: string;
  };
  course_introduction: {
    description: string;
    prerequisites: string;
    you_learn: string;
    course_id: string;
  };
  lessons: {
    title: string;
    content: string;
    course_id: string;
    order: number;
  };
  user_lesson_progress: {
    _id: string;
    user_id: string;
    course_id: string;
    lesson_id: string;
    status: progress;
    progress_percent: number;
    createdAt: Date;
    updatedAt: Date;
  };
  user_courses: {
    user_id: string;
    course_id: string;
    enrolled_at: string;
    progress: string;
  };
  user_accounts: {
    username: string;
    email: string;
    full_name: string;
    role: string;
  };
  user_information: {
    user_id: string;
    bio?: string;
    avatar_url?: string;
    birth_date?: string;
  };
  lesson_contents: {
    lesson_id: string;
    content_type: string;
    content_data: string;
    order: number;
  };
  video_contents: {
    lesson_id: string;
    video_url: string;
    duration: number;
    thumbnail_url?: string;
  };
};

// Dynamic form values type based on collection name
export type CollectionFormValues<
  T extends keyof CollectionFormValuesMap = keyof CollectionFormValuesMap
> = T extends keyof CollectionFormValuesMap
  ? CollectionFormValuesMap[T]
  : Record<string, FieldValueType>;

export interface SidebarProps {
  collections: Collection[];
  activeCollection: string;
  onCollectionChange: (collection: string) => void;
}

export interface DataTableProps {
  collection: Collection;
  data: DatabaseRecord[];
  onEdit: (record: DatabaseRecord) => void;
  onDelete: (record: DatabaseRecord) => void;
}

export interface AddEditModalProps<
  T extends keyof CollectionFormValuesMap = keyof CollectionFormValuesMap
> {
  isOpen: boolean;
  onClose: () => void;
  collection: Collection<T>;
  record: CollectionFormValues<T> | null;
  onSave: (data: CollectionFormValues<T>) => Promise<void>;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DatabaseRecord | null;
  onConfirm: () => void;
}
