import mongoose from 'mongoose'

export const validateMongoDbId = (id: string) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id)
  if (!isValidId) {
    throw new Error('This ID is not valid or Not Found.')
  }
}