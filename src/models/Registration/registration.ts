import mongoose, { Schema, model } from "mongoose"


export interface IRegistration {
    _id: mongoose.Types.ObjectId,
    eventId: string,
    name: string
    email: string
    usn: string
    phone: string,
    taxnId: string,
}

const RegistrationSchema = new Schema<IRegistration>({
    eventId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    usn: { type: String, required: true },
    phone: { type: String, required: true },
    taxnId: { type: String, required: true },
})


export const Registration = model<IRegistration>("Registration", RegistrationSchema)