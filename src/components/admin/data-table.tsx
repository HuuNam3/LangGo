"use client"

import { Edit, Trash2, Calendar, Loader2, Eye } from "lucide-react"
import type { DataTableProps, DatabaseRecord } from "@/types/database"

export function DataTable({ collection, data, onEdit, onDelete, onView, isLoading = false }: DataTableProps & { onView: (record: DatabaseRecord) => void; isLoading?: boolean }) {
  const formatValue = (value: unknown, type: string) => {
    if (value === null || value === undefined) return "-"

    if (type === "date" || (typeof value === "string" && value.includes("T") && value.includes("Z"))) {
      try {
        return new Date(value as string | number | Date).toLocaleString("vi-VN")
      } catch {
        return "-"
      }
    }

    if (type === "number") {
      return typeof value === "number" ? value.toLocaleString("vi-VN") : String(value)
    }

    if (typeof value === "string" && value.length > 100) {
      return value.substring(0, 100) + "..."
    }

    return String(value)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Loader2 className="w-12 h-12 mx-auto animate-spin" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Đang tải dữ liệu...</h3>
        <p className="text-gray-500">Vui lòng đợi trong giây lát.</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Calendar className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có dữ liệu</h3>
        <p className="text-gray-500">Nhấn &quotThêm mới&quot để tạo bản ghi đầu tiên.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              {collection.fields.map((field) => (
                <th
                  key={field.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {field.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                  {record._id.substring(0, 8)}...
                </td>
                {collection.fields.map((field) => (
                  <td key={field.key} className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">{formatValue(record[field.key], field.type)}</div>
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.createdAt ? formatValue(record.createdAt, "date") : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(record)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(record)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(record)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
