"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { DataTable } from "./data-table"
import { AddEditModal } from "./add-edit-modal"
import { DeleteConfirmModal } from "./delete-confirm-modal"
import type { DatabaseRecord, CollectionFormValues } from "@/types/database"
import { ViewDetailModal } from "./view-detail-modal"
import { collections } from "@/types/database"

import { toast } from "sonner"

export function AdminDashboard() {
  const [activeCollection, setActiveCollection] = useState("course_categories")
  const [data, setData] = useState<Record<string, DatabaseRecord[]>>({})
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DatabaseRecord | null>(null)
  const [deletingRecord, setDeleteingRecord] = useState<DatabaseRecord | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingRecord, setViewingRecord] = useState<DatabaseRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [listId, setListId] = useState()

  const currentCollection = collections.find((c) => c.name === activeCollection)!
  const currentData = data[activeCollection] || []

  // Fetch data for current collection
  const fetchData = async (collectionName: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/collections/${collectionName}`)
      const result = await response.json()

      if (result.success) {
        setData((prev) => ({
          ...prev,
          [collectionName]: result.data,
        }))
      } else {
        toast.error("Không thể tải dữ liệu")
      }

    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Không thể tải dữ liệu")
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when collection changes
  useEffect(() => {
    if (!data[activeCollection]) {
      fetchData(activeCollection)
    }
  }, [activeCollection, data])

  const handleAdd = () => {
    setEditingRecord(null)
    setIsAddEditModalOpen(true)
  }

  const handleEdit = (record: DatabaseRecord) => {
    setEditingRecord(record)
    setIsAddEditModalOpen(true)
  }

  const handleDelete = (record: DatabaseRecord) => {
    setDeleteingRecord(record)
    setIsDeleteModalOpen(true)
  }

  const handleView = (record: DatabaseRecord) => {
    setViewingRecord(record)
    setIsViewModalOpen(true)
  }

  const handleSave = async <T extends keyof CollectionFormValues>(formData: CollectionFormValues<T>) => {
    try {
      let response

      if (editingRecord) {
        // Update existing record
        response = await fetch(`/api/collections/${activeCollection}/${editingRecord._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      } else {
        // Create new record
        response = await fetch(`/api/collections/${activeCollection}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      }

      const result = await response.json()

      if (result.success) {
        // Refresh data
        await fetchData(activeCollection)
        setIsAddEditModalOpen(false)
        setEditingRecord(null)

        toast.success(editingRecord ? "Cập nhật thành công" : "Thêm mới thành công")
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } catch (error) {
      console.error("Error saving data:", error)
      toast.error("Không thể lưu dữ liệu")
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingRecord) return

    try {
      const response = await fetch(`/api/collections/${activeCollection}/${deletingRecord._id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        // Refresh data
        await fetchData(activeCollection)
        setIsDeleteModalOpen(false)
        setDeleteingRecord(null)

        toast.success("Thành công")
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } catch (error) {
      console.error("Error deleting data:", error)
      toast.error("Không thể xóa dữ liệu")
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collections={collections} activeCollection={activeCollection} onCollectionChange={setActiveCollection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{currentCollection.displayName}</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Thêm mới
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <DataTable
            collection={currentCollection}
            data={currentData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            onView={handleView}
          />
        </main>
      </div>

      <AddEditModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        collection={currentCollection as never}
        record={editingRecord as never}
        onSave={handleSave as never}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        record={deletingRecord}
        onConfirm={handleConfirmDelete}
      />

      <ViewDetailModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        collection={currentCollection}
        record={viewingRecord}
      />
    </div>
  )
}
