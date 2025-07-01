"use client"

import { useEffect, useState } from "react"
import { useForm, ControllerRenderProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Combobox } from "@/components/common/combobox"
import { schemas } from "@/lib/schemas"
import type { AddEditModalProps, FieldValueType, CollectionFormValues, CollectionField } from "@/types/database"

type DynamicFormValues = Record<string, FieldValueType>;

export function AddEditModal<T extends keyof CollectionFormValues>({
  isOpen,
  onClose,
  collection,
  record,
  onSave
}: AddEditModalProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingOptions, setIsLoadingOptions] = useState(false)
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, Array<{ value: string; label: string }>>>({})
  const schema = schemas[collection.name as keyof typeof schemas]

  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(schema as never),
    defaultValues: record
      ? collection.fields.reduce((acc, field) => {
        acc[field.key] = (record as Record<string, FieldValueType>)[field.key] ?? (field.type === "number" ? 0 : "");
        return acc;
      }, {} as DynamicFormValues)
      : collection.fields.reduce((acc, field) => {
        acc[field.key] = field.type === "number" ? 0 : "";
        return acc;
      }, {} as DynamicFormValues),
  })

  useEffect(() => {
    if (record) {
      const formData = collection.fields.reduce((acc, field) => {
        acc[field.key] = record[field.key] || (field.type === "number" ? 0 : "")
        return acc
      }, {} as DynamicFormValues)
      form.reset(formData)
    } else {
      const emptyData = collection.fields.reduce((acc, field) => {
        acc[field.key] = field.type === "number" ? 0 : ""
        return acc
      }, {} as DynamicFormValues)
      form.reset(emptyData)
    }
  }, [record, collection.fields, form])

  useEffect(() => {
    const loadOptions = async () => {
      if (!isOpen) return

      const comboboxFields = collection.fields.filter((field) => field.type === "combobox")
      const fieldsNeedingOptions = comboboxFields.filter((field) => !field.options || field.options.length === 0)

      if (fieldsNeedingOptions.length === 0) return

      setIsLoadingOptions(true)

      const optionsMap: Record<string, Array<{ value: string; label: string }>> = {}

      for (const field of fieldsNeedingOptions) {
        let optionsCollection = ""

        switch (field.key) {
          case "course_categories_id":
            optionsCollection = "course_categories"
            break
          case "course_id":
            optionsCollection = "courses"
            break
          case "lesson_id":
            optionsCollection = "lessons"
            break
          case "user_id":
            optionsCollection = "user_accounts"
            break
          default:
            continue
        }

        try {
          const response = await fetch(`/api/options/${optionsCollection}`)
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              optionsMap[field.key] = result.data
            }

          }
        } catch (error) {
          console.error(`Error loading options for ${field.key}:`, error)
          optionsMap[field.key] = []
        }
      }
      setDynamicOptions(optionsMap)
      setIsLoadingOptions(false)
    }

    if (isOpen) {
      setDynamicOptions({})
      loadOptions()
    }
  }, [isOpen, collection.fields])

  const onSubmit = async (data: DynamicFormValues) => {
    setIsLoading(true)
    try {
      await onSave(data as never)
      form.reset()
    } catch (error) {
      console.error("Error saving data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    setDynamicOptions({})
    onClose()
  }

  const renderField = (field: CollectionField, formField: ControllerRenderProps<DynamicFormValues, string>) => {
    if (field.type === "combobox") {
      const options = field.options || dynamicOptions.course_categories_id || []
      const isLoadingThisField = isLoadingOptions && (!field.options || field.options.length === 0)
      console.log(field.key)
      console.log(dynamicOptions.course_categories_id)
      console.log(options)
      if (isLoadingThisField) {
        return (
          <div className="flex items-center gap-2 p-3 border rounded-md bg-gray-50">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-500">Đang tải...</span>
          </div>
        )
      }

      return (
        <Combobox
          options={dynamicOptions.course_categories_id}
          value={formField.value !== undefined && formField.value !== null ? String(formField.value) : ""}
          onValueChange={formField.onChange}
          placeholder={`Chọn ${field.label.toLowerCase()}`}
          disabled={isLoadingThisField}
        />
      )
    }

    if (field.type === "textarea") {
      return <Textarea placeholder={`Nhập ${field.label.toLowerCase()}`} {...formField} value={formField.value || ""} />
    }

    return (
      field.type === "array" ? (
        <Textarea
          placeholder={`Nhập nhiều ${field.label.toLowerCase()} (ngăn cách bằng dấu phẩy)`}
          value={Array.isArray(formField.value) ? formField.value.join(", ") : ""}
          onChange={(e) => {
            const value = e.target.value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item.length > 0)
            formField.onChange(value)
          }}
        />
      ) : (
        <Input
          type={
            field.type === "number"
              ? "number"
              : field.type === "email"
                ? "email"
                : field.type === "date"
                  ? "date"
                  : "text"
          }
          placeholder={`Nhập ${field.label.toLowerCase()}`}
          {...formField}
          value={formField.value || ""}
          onChange={(e) => {
            const value =
              field.type === "number"
                ? e.target.value === ""
                  ? 0
                  : Number(e.target.value)
                : e.target.value
            formField.onChange(value)
          }}
        />
      )
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {record ? "Chỉnh sửa" : "Thêm mới"} {collection.displayName}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {collection.fields.map((field) => (
              <FormField
                key={field.key}
                control={form.control}
                name={field.key}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FormControl>{renderField(field, formField)}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {record ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
