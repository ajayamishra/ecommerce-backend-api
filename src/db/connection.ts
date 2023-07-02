import mongoose from 'mongoose'

export const connectDB = async () => {
  const dbUser = process.env.MONGO_DB_USER
  const dbPassword = process.env.MONGO_DB_PASSWORD
  const dbCluster = process.env.MONGO_DB_CLUSTER

  const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbCluster}`
  try {
    const connection = await mongoose.connect(dbUrl, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions)
    return connection
  } catch(error: any) {
    throw new Error(error)
  }
}