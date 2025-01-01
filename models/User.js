import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
     timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
     },
    toObject: {
      transform: function (_doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
      console.error("Error hashing password:", error);
    next(error);
  }
});


userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

export default User;