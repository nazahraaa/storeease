    import mongoose from 'mongoose';
    import bcrypt from 'bcryptjs';

    const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Nama wajib diisi'],
    },
    username: {
        type: String,
        required: [true, 'Username wajib diisi'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email wajib diisi'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Format email tidak valid',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password wajib diisi'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

    // Hash password sebelum menyimpan ke database
    UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    });

    // Method untuk membandingkan password saat login
    UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    };

    export default mongoose.model('User', UserSchema);