"use client"

import { Eye, Calendar, User, Hash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { DatabaseRecord, Collection } from "@/types/database"

interface ViewDetailModalProps {
  isOpen: boolean
  onClose: () => void
  collection: Collection
  record: DatabaseRecord | null
}

export function ViewDetailModal({ isOpen, onClose, collection, record }: ViewDetailModalProps) {
  if (!record) return null

  const formatValue = (value: unknown, type: string) => {
    if (value === null || value === undefined) return "Không có dữ liệu"

    if (type === "date" || (typeof value === "string" && value.includes("T") && value.includes("Z"))) {
      try {
        return new Date(value as string | number | Date).toLocaleString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      } catch {
        return "Không có dữ liệu"
      }
    }

    if (type === "number") {
      return typeof value === "number" ? value.toLocaleString("vi-VN") : String(value)
    }

    if (type === "email") {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {String(value)}
        </a>
      )
    }

    if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {value}
        </a>
      )
    }

    return String(value)
  }

  const getFieldIcon = (type: string) => {
    switch (type) {
      case "email":
        return <User className="w-4 h-4" />
      case "number":
        return <Hash className="w-4 h-4" />
      case "date":
        return <Calendar className="w-4 h-4" />
      default:
        return <Eye className="w-4 h-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Chi tiết {collection.displayName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header với ID và timestamps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">ID</label>
                <div className="mt-1 font-mono text-sm bg-white px-2 py-1 rounded border">{record._id}</div>
              </div>
              {record.createdAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                  <div className="mt-1 text-sm">{formatValue(record.createdAt, "date")}</div>
                </div>
              )}
              {record.updatedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                  <div className="mt-1 text-sm">{formatValue(record.updatedAt, "date")}</div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Thông tin chi tiết */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin chi tiết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collection.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getFieldIcon(field.type)}
                    <label className="text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Bắt buộc
                        </Badge>
                      )}
                    </label>
                  </div>

                  <div className="bg-white border rounded-lg p-3 min-h-[2.5rem] flex items-start">
                    {field.type === "textarea" ? (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {formatValue(record[field.key], field.type)}
                      </div>
                    ) : (
                      <div className="text-sm">{formatValue(record[field.key], field.type)}</div>
                    )}
                  </div>

                  {/* Hiển thị type của field */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {field.type === "text" && "Văn bản"}
                      {field.type === "textarea" && "Văn bản dài"}
                      {field.type === "number" && "Số"}
                      {field.type === "email" && "Email"}
                      {field.type === "date" && "Ngày tháng"}
                    </Badge>
                    {record[field.key] && (
                      <span className="text-xs text-gray-500">
                        {typeof record[field.key] === "string"
                          ? `${(record[field.key] as string).length} ký tự`
                          : typeof record[field.key] === "number"
                            ? "Số"
                            : "Có dữ liệu"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin bổ sung nếu có */}
          {Object.keys(record).some(
            (key) => !collection.fields.find((f) => f.key === key) && !["_id", "createdAt", "updatedAt"].includes(key),
          ) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Thông tin bổ sung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(record)
                    .filter(
                      ([key]) =>
                        !collection.fields.find((f) => f.key === key) &&
                        !["_id", "createdAt", "updatedAt"].includes(key),
                    )
                    .map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, " ")}</label>
                        <div className="bg-gray-50 border rounded-lg p-3 text-sm">{formatValue(value, "text")}</div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
