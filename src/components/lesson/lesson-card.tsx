"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function LessonCard({ lessonName, id, pathName }: {
  lessonName: string, id: string,
  pathName: string,
}) {
  const [expandedSections, setExpandedSections] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type")
  const toggleSection = () => {
    setExpandedSections((prev) => !prev);
  };

  const switchType = (typeTarget: string) => {
    if (typeTarget == type) {
      return "bg-orange-100 border-l-4 border-orange-500"
    } else {
      return "hover:bg-gray-50"
    }
  }

  const switchType1 = (typeTarget: string) => {
    if (typeTarget == type) {
      return "bg-orange-500"
    } else {
      return "bg-gray-300"
    }
  }

  return (
    <Collapsible open={expandedSections} onOpenChange={() => toggleSection()}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg">
        <div>
          <div className="font-medium text-gray-800">{lessonName}</div>
          <div className="text-sm text-gray-500">0/4 | 29:30</div>
        </div>
        {expandedSections ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 space-y-1">
        <Link href={pathName + "?id=" + id + "&type=video"}
          className={`flex items-center gap-3 p-3 ${switchType("video")} rounded-lg`}>
          <div className={`w-6 h-6 ${switchType1("video")} rounded-full flex items-center justify-center text-white text-xs`}>
            {/* ▶ */}
            1
          </div>
          <div className="flex-1">
            {/* <div className="text-sm font-medium text-orange-700"> */}
            <div className="text-sm">
              1. Video bài giảng
            </div>
            {/* <div className="text-xs text-orange-600">6:30</div> */}
            <div className="text-xs text-gray-500">11:46</div>
          </div>
        </Link>
        <Link href={pathName + "?id=" + id + "&type=quizVideo"}
          className={`flex items-center gap-3 p-3 ${switchType("quizVideo")} rounded-lg`}>
          <div className={`w-6 h-6 ${switchType1("quizVideo")} rounded-full flex items-center justify-center text-white text-xs`}>
            2
          </div>
          <div className="flex-1">
            {/* <div className="text-sm text-gray-700"> */}
            <div className="text-sm">
              2. Câu hỏi ôn tập sau video
            </div>
            <div className="text-xs text-gray-500">5:00</div>
          </div>
          {/* <Lock className="w-4 h-4 text-gray-400" /> */}
        </Link>
        <Link href={pathName + "?id=" + id + "&type=writen"}
          className={`flex items-center gap-3 p-3 ${switchType("writen")} rounded-lg`}>
          <div className={`w-6 h-6 ${switchType1("writen")} rounded-full flex items-center justify-center text-white text-xs`}>
            3
          </div>
          <div className="flex-1">
            {/* <div className="text-sm text-gray-700"> */}
            <div className="text-sm">
              3. Bài luyện từ vựng & phát âm
            </div>
            <div className="text-xs text-gray-500">8:00</div>
          </div>
          {/* <Lock className="w-4 h-4 text-gray-400" /> */}
        </Link>
        <Link href={pathName + "?id=" + id + "&type=quizNonWriten"}
          className={`flex items-center gap-3 p-3 ${switchType("quizNonWriten")} rounded-lg`}>
          <div className={`w-6 h-6 ${switchType1("quizNonWriten")} rounded-full flex items-center justify-center text-white text-xs`}>
            4
          </div>
          <div className="flex-1">
            {/* <div className="text-sm text-gray-700"> */}
            <div className="text-sm">
              4. Bài tập tổng kết hoàn thành
            </div>
            <div className="text-xs text-gray-500">10:00</div>
          </div>
          {/* <Lock className="w-4 h-4 text-gray-400" /> */}
        </Link>
      </CollapsibleContent>
    </Collapsible>
  );
}
