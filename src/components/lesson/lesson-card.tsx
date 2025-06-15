"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function LessonCard({lessonName}:{lessonName:string} ) {
  const [expandedSections, setExpandedSections] = useState(false);

  const toggleSection = () => {
    setExpandedSections((prev) => !prev);
  };

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
        <div className="flex items-center gap-3 p-3 bg-orange-100 border-l-4 border-orange-500 rounded-lg">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
            ▶
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-orange-700">
              1. Video bài giảng
            </div>
            <div className="text-xs text-orange-600">6:30</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
            2
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-700">
              2. Câu hỏi ôn tập sau video
            </div>
            <div className="text-xs text-gray-500">5:00</div>
          </div>
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
            3
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-700">
              3. Bài luyện từ vựng & phát âm
            </div>
            <div className="text-xs text-gray-500">8:00</div>
          </div>
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
            4
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-700">
              4. Bài tập tổng kết hoàn thành
            </div>
            <div className="text-xs text-gray-500">10:00</div>
          </div>
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
