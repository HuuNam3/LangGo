"use client"

import { Card } from "@/components/ui/card"
import { PronunciationButton } from "@/components/ui/pronunciation-button"

export default function WrittenLesson() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left sidebar */}
          <div className="space-y-6 md:col-span-1">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                <h2 className="text-xl font-bold">Key Vocabulary</h2>
              </div>
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Hello</p>
                    <p className="text-sm text-gray-500">Xin chào</p>
                  </div>
                  <PronunciationButton language="english" text="hello" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Good morning</p>
                    <p className="text-sm text-gray-500">Chào buổi sáng</p>
                  </div>
                  <PronunciationButton language="english" text="good morning"  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Good afternoon</p>
                    <p className="text-sm text-gray-500">Chào buổi chiều</p>
                  </div>
                  <PronunciationButton language="english" text="good afternoon"  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Good evening</p>
                    <p className="text-sm text-gray-500">Chào buổi tối</p>
                  </div>
                  <PronunciationButton language="english" text="good evening" />
                </div>
              </div>
            </Card>
          </div>

          {/* Main lesson content */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                <h2 className="text-xl font-bold">Basic Greetings</h2>
              </div>

              <div className="p-3">
                <div className="space-y-6">
                  {/* Greeting 1 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">Hello</h3>
                        <p className="text-gray-600">Xin chào</p>
                      </div>
                      <PronunciationButton language="english" text="Hello, my name is Nam"  variant="outline" className="rounded-full" />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Đây là lời chào phổ biến nhất trong tiếng . Bạn có thể dùng nó vào bất kỳ thời điểm nào trong ngày khi gặp ai đó.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Ví dụ:</p>
                      <p className="mb-1">Hello, my name is Nam.</p>
                      <p className="text-gray-600">Xin chào, tên tôi là Nam.</p>
                    </div>
                  </div>

                  {/* Greeting 2 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">Good morning</h3>
                        <p className="text-gray-600">Chào buổi sáng</p>
                      </div>
                      <PronunciationButton
                        language="english"
                        text="Good morning! The weather is really nice today." 
                        variant="outline"
                        className="rounded-full"
                      />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Sử dụng lời chào này vào buổi sáng, thường là từ khi bạn thức dậy cho đến khoảng 8 giờ sáng.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Ví dụ:</p>
                      <p className="mb-1">Good morning! The weather is really nice today.</p>
                      <p className="text-gray-600">Chào buổi sáng! Thời tiết hôm nay đẹp quá!.</p>
                    </div>
                  </div>

                  {/* Greeting 3 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">Good evening</h3>
                        <p className="text-gray-600">Chào buổi tối</p>
                      </div>
                      <PronunciationButton
                        language="english"
                        text="Good evening! Have you eaten yet?" 
                        variant="outline"
                        className="rounded-full"
                      />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Sử dụng lời chào này vào buổi tối, thường là sau khi mặt trời lặn hoặc khoảng 7 giờ chiều.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Ví dụ:</p>
                      <p className="mb-1">Good evening! Have you eaten yet?</p>
                      <p className="text-gray-600">Chào buổi tối! Bạn đã ăn chưa?</p>
                    </div>
                  </div>

                  {/* Greeting 4 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">Goodbye</h3>
                        <p className="text-gray-600">Chào tạm biệt</p>
                      </div>
                      <PronunciationButton language="english" text="hello" variant="outline" className="rounded-full" />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Đây là cách thông thường để nói lời tạm biệt trong tiếng anh. Nghĩa đen của nó là &rdquo;hẹn gặp lại&rdquo;.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Ví dụ:</p>
                      <p className="mb-1">See you tomorrow, goodbye!</p>
                      <p className="text-gray-600">Hẹn gặp lại vào ngày mai, tạm biệt!</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
