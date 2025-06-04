"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookOpen, CheckCircle, Star, Info, FileText } from "lucide-react";
import Loading from "@/components/common/Loading";
import { ICourse } from "@/types/database";
import AddEnrollmentForm from "@/components/my-courses/add-enrollment-form";
import { useAuth } from "@/contexts/AuthContext";

export default function LessonPage() {
  const params = useParams();
  const { user: userData } = useAuth();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [course, setCourse] = useState<ICourse>();
  const router = useRouter();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (!userData?.id || !slug) return;

        const res = await fetch(`/api/courses/${slug}`, {
          headers: {
            "x-user-id": userData.id,
          },
        });

        const data = await res.json();
        if (data == true) {
          router.push(`/lessons/${slug}`);
          return;
        }

        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch lesson:", err);
      }
    };

    fetchLesson();
  }, [slug, userData?.id, router]);
  return (
    <div className="min-h-screen bg-white">
      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {!course ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left sidebar */}
            <div className="space-y-6 md:col-span-1">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-bold">Course Information</h2>
                </div>
                <div className="space-y-4 p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/avatar.png"
                      alt="Nam"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium">Nam</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{course.duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-pink-100 p-2 text-pink-600">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-medium">{course.language}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-pink-100 p-2 text-pink-600">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">{course.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Lessons </p>
                      <p className="font-medium">3</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="font-medium">{course.level}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main introduction content */}
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                  <h2 className="text-xl font-bold">Course Introduction</h2>
                </div>

                <div className="p-6">
                  <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      width={600}
                      height={300}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="mb-6 rounded-lg bg-purple-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-purple-800">
                      About This course
                    </h3>
                    <p className="text-gray-700">
                      {course.introduction.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold">
                      What You&apos;ll Learn
                    </h3>
                    <ul className="space-y-2">
                      {course.introduction.you_learn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold">
                      Prerequisites
                    </h3>
                    <p className="text-gray-700">
                      {course.introduction.prerequisites}
                    </p>
                  </div>

                  <AddEnrollmentForm
                    userId={userData?.id || ""}
                    courseId={course._id}
                    slug={slug}
                  />
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
