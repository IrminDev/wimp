import mongoose from 'mongoose';
const { Schema } = mongoose;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    cubicle: {
        type: String,
    },
    department: {
        type: String,
    },
    phone: {
        type: String,
    }
})

TeacherSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
