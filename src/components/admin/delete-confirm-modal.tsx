"use client"

import { AlertTriangle, X } from "lucide-react"
import type { DeleteConfirmModalProps } from "@/types/database"

export function DeleteConfirmModal({ isOpen, onClose, record, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen || !record) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Xác nhận xóa</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Bạn có chắc chắn muốn xóa?</h3>
              <p className="text-gray-600">Hành động này không thể hoàn tác. Bản ghi sẽ bị xóa vĩnh viễn.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">ID:</span> {record._id}
            </p>
            {record.title && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Tiêu đề:</span> {record.title}
              </p>
            )}
            {record.name && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Tên:</span> {record.name}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
