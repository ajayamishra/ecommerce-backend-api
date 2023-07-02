import mongoose, { Document, Model, Types } from 'mongoose'
import bcrypt from 'bcrypt'

const { ObjectId } = Types

interface UserAttributes {
  firstname: string
  lastname: string
  email: string
  mobile: string
  password: string
  role: string
  isDisabled: boolean
  cart: any
  address: any
  wishlist: any
}

export interface UserDocument extends UserAttributes, Document {
  isPasswordMatched(password: string): Promise<boolean>
  _id: string
}

interface UserModel extends Model<UserDocument> {
  findOneByEmail(email: string): Promise<UserDocument | null>
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>({
  firstname:{
      type:String,
      required:true,
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
      type:String,
      required:true,
      unique:true
  },
  mobile:{
      type:String,
      required:true,
      unique:true
  },
  password:{
      type:String,
      required:true
  },
  role: {
    type: String,
    default: 'user'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  cart: {
    type: Array,
    default: []
  },
  address: [{
    type: ObjectId,
    ref: 'Address'
  }],
  wishlist: [{
    type: ObjectId,
    ref: 'Product'
  }]
},
{
  timestamps: true
}
)

userSchema.pre('save', async function (next:any) {
  const user = this
  const salt = bcrypt.genSaltSync(10)
  user.password = await bcrypt.hash(user.password, salt)
})

userSchema.methods.isPasswordMatched = async function (inputtedPassword: string) {
  return await bcrypt.compare(inputtedPassword, this.password)
}

export const User =  mongoose.model('User', userSchema)