"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { schemas } from "@/lib/schemas"
import type { AddEditModalProps, FieldValueType, CollectionFormValues } from "@/types/database"

type DynamicFormValues = Record<string, FieldValueType>;

export function AddEditModal<T extends keyof CollectionFormValues>({ 
  isOpen, 
  onClose, 
  collection, 
  record, 
  onSave 
}: AddEditModalProps<T>) {
  const [isLoading, setIsLoading] = useState(false)

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
    onClose()
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
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={`Nhập ${field.label.toLowerCase()}`}
                          {...formField}
                          value={formField.value || ""}
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
                      )}
                    </FormControl>
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
