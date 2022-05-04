import mongoose, { Schema, model } from "mongoose"



interface ILog{
    _id: mongoose.Types.ObjectId,
    email: string,
    changed: string,
    updatedData: any,
    date: Date
}

const LogSchema = new Schema<ILog>({
    email: { type: String, required: true },
    changed: { type: String, enum: ["ClubData","EventData",],required: true },
    updatedData: { type: Object, required: true },
    date: { type: Date, required: true },
})

export const Log = model<ILog>("Log", LogSchema)