import { getDb } from "@/lib/mongodb"
import {  
  ObjectId, 
  WithId, 
  Filter, 
  UpdateResult, 
  DeleteResult,
  OptionalUnlessRequiredId,
  MatchKeysAndValues
} from "mongodb"

// Base interface cho tất cả documents
interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Lấy tất cả documents từ collection
 */
export async function get<T extends BaseDocument>(
  path: string
): Promise<WithId<T>[]> {
  const db = await getDb()
  return db.collection<T>(path).find({}).toArray()
}

/**
 * Tạo document mới
 */
export async function post<T extends BaseDocument>(
  path: string,
  data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>
): Promise<WithId<T>> {
  const db = await getDb()
  const now = new Date()
  
  // Create the document with required fields
  const documentToInsert = {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as unknown as OptionalUnlessRequiredId<T>

  const result = await db.collection<T>(path).insertOne(documentToInsert)
  return {
    ...documentToInsert,
    _id: result.insertedId,
  } as WithId<T>
}

/**
 * Cập nhật toàn bộ document
 */
export async function put<T extends BaseDocument>(
  path: string,
  id: ObjectId,
  data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>
): Promise<UpdateResult> {
  const db = await getDb()
  const updateData: MatchKeysAndValues<T> = {
    ...data as object,
    updatedAt: new Date()
  } as MatchKeysAndValues<T>

  return db.collection<T>(path).updateOne(
    { _id: id } as Filter<T>,
    { $set: updateData }
  )
}

/**
 * Cập nhật một phần của document
 */
export async function patch<T extends BaseDocument>(
  path: string,
  id: ObjectId,
  data: Partial<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>
): Promise<UpdateResult> {
  const db = await getDb()
  const updateData: MatchKeysAndValues<T> = {
    ...data as object,
    updatedAt: new Date()
  } as MatchKeysAndValues<T>

  return db.collection<T>(path).updateOne(
    { _id: id } as Filter<T>,
    { $set: updateData }
  )
}

/**
 * Xóa document
 */
export async function del<T extends BaseDocument>(
  path: string,
  id: ObjectId
): Promise<DeleteResult> {
  const db = await getDb()
  return db.collection<T>(path).deleteOne({ _id: id } as Filter<T>)
}
