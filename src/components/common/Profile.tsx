import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/lib/data"

export default function UserProfile() {
  // Giả lập dữ liệu người dùng (có thể lấy từ API hoặc session)
  

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {/* Phần thông tin cá nhân */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-lg p-6">
        <Image
          src={User.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className="rounded-full border-2 border-blue-500"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{User.name}</h1>
          <p className="text-gray-600">@{User.username}</p>
          <p className="text-gray-600">{User.email}</p>
          <Link href="/settings">
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              Chỉnh sửa hồ sơ
            </Button>
          </Link>
        </div>
      </div>

      {/* Phần tiến trình học tập */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Tiến trình học tập</h2>
        <div className="mt-4">
          <p className="text-gray-700">Cấp độ: <span className="font-medium">{User.level}</span></p>
          <p className="text-gray-700 mt-2">Tiến độ hoàn thành:</p>
          <Progress value={User.progress} className="mt-2" />
          <p className="text-sm text-gray-500 mt-1">{User.progress}% khóa học đã hoàn thành</p>
        </div>
      </div>

      {/* Phần khóa học đang tham gia */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Khóa học đang tham gia</h2>
        <ul className="mt-4 space-y-2">
          {User.courses.map((course, index) => (
            <li key={index} className="text-gray-700">
              <Link href={`/courses/${course.toLowerCase().replace(/ /g, "-")}`} className="text-blue-500 hover:underline">
                {course}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/courses">
          <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
            Khám phá thêm khóa học
          </Button>
        </Link>
      </div>

      {/* Phần thành tựu */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Thành tựu</h2>
        <ul className="mt-4 space-y-2">
          {User.achievements.map((achievement, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="text-yellow-500 mr-2">🏆</span> {achievement}
            </li>
          ))}
        </ul>
      </div>

      {/* Phần liên hệ hoặc hỗ trợ */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">Cần hỗ trợ? <Link href="/support" className="text-blue-500 hover:underline">Liên hệ với chúng tôi</Link></p>
      </div>
    </div>
  );
}