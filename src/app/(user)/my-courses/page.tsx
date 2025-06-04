"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMyCourses } from "@/types/database";
import Loading from "@/components/common/Loading";
import CourseCard from "@/components/lesson/course-card";
import Link from "next/link";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/my-courses");
        const data = await response.json();
        setMyCourses(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Khóa học của tôi
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và tiếp tục học tập các khóa học của bạn
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  // value={searchQuery}
                  // onChange={() => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Lọc theo cấp độ
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Tất cả</DropdownMenuItem>
                  <DropdownMenuItem>Bắt đầu học</DropdownMenuItem>
                  <DropdownMenuItem>Trung cấp</DropdownMenuItem>
                  <DropdownMenuItem>Nâng cao</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {isLoading ? (
          <Loading />
        ) : myCourses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Chưa có khóa học nào được đăng ký
            <Link href="/"><span className="ml-2 text-blue-500">quay lại xem các khóa học</span></Link>
          </div>
        ) : (
          myCourses.map((item: IMyCourses) => (
            <CourseCard
              key={item._id}
              course={item.course}
              progress={item.progress}
            />
          ))
        )}
      </div>
    </div>
  );
}
