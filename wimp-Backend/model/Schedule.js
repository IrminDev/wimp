import mongoose from 'mongoose';
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    group: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher', // Reference to the 'Teacher' model
        required: true
    },
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
        required: true
    }
});

ScheduleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export default mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);
