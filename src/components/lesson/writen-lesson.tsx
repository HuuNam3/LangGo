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
                    <p className="font-medium">你好</p>
                    <p className="text-sm text-gray-500">Nǐ hǎo</p>
                  </div>
                  <PronunciationButton language="english" text="hello" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">早上好</p>
                    <p className="text-sm text-gray-500">Zǎoshang hǎo</p>
                  </div>
                  <PronunciationButton language="english" text="hello"  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">晚上好</p>
                    <p className="text-sm text-gray-500">Wǎnshang hǎo</p>
                  </div>
                  <PronunciationButton language="english" text="hello"  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">再见</p>
                    <p className="text-sm text-gray-500">Zàijiàn</p>
                  </div>
                  <PronunciationButton language="english" text="hello" />
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
                        <h3 className="text-lg font-bold">你好 / Nǐ hǎo</h3>
                        <p className="text-gray-600">Hello</p>
                      </div>
                      <PronunciationButton language="english" text="hello"  variant="outline" className="rounded-full" />
                    </div>
                    <p className="mb-3 text-gray-700">
                      This is the most common greeting in Mandarin Chinese. It can be used at any time of the day when
                      meeting someone.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Example:</p>
                      <p className="mb-1">你好，我叫小明。(Nǐ hǎo, wǒ jiào Xiǎo Míng.)</p>
                      <p className="text-gray-600">Hello, my name is Xiao Ming.</p>
                    </div>
                  </div>

                  {/* Greeting 2 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">早上好 / Zǎoshang hǎo</h3>
                        <p className="text-gray-600">Good morning</p>
                      </div>
                      <PronunciationButton
                        language="english"
                        text="hello" 
                        variant="outline"
                        className="rounded-full"
                      />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Use this greeting in the morning, typically from when you wake up until around 11 AM.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Example:</p>
                      <p className="mb-1">早上好！今天天气真好。(Zǎoshang hǎo! Jīntiān tiānqì zhēn hǎo.)</p>
                      <p className="text-gray-600">Good morning! The weather is really nice today.</p>
                    </div>
                  </div>

                  {/* Greeting 3 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">晚上好 / Wǎnshang hǎo</h3>
                        <p className="text-gray-600">Good evening</p>
                      </div>
                      <PronunciationButton
                        language="english"
                        text="hello" 
                        variant="outline"
                        className="rounded-full"
                      />
                    </div>
                    <p className="mb-3 text-gray-700">
                      Use this greeting in the evening, typically after sunset or around 6 PM.
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Example:</p>
                      <p className="mb-1">晚上好！你吃饭了吗？(Wǎnshang hǎo! Nǐ chīfàn le ma?)</p>
                      <p className="text-gray-600">Good evening! Have you eaten yet?</p>
                    </div>
                  </div>

                  {/* Greeting 4 */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">再见 / Zàijiàn</h3>
                        <p className="text-gray-600">Goodbye</p>
                      </div>
                      <PronunciationButton language="english" text="hello" variant="outline" className="rounded-full" />
                    </div>
                    <p className="mb-3 text-gray-700">
                      This is the standard way to say goodbye in Mandarin. It literally means &ldquo;see you
                      again.&rdquo;
                    </p>
                    <div className="rounded-md bg-gray-100 p-3">
                      <p className="font-medium">Example:</p>
                      <p className="mb-1">明天见，再见！(Míngtiān jiàn, zàijiàn!)</p>
                      <p className="text-gray-600">See you tomorrow, goodbye!</p>
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
