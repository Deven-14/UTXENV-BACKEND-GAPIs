import mongoose, { Schema, model } from "mongoose";
import { CoordinatorSchema, ICoordinator } from "../types/coordinator";


export interface IEventCoordinator {
    _id: mongoose.Types.ObjectId,
    eventId: string,
    eventName: string,
    description: string,
    club: string
    regFee: number,
    lastRegDate: Date,
    participationNo:string,
    posterLink: string,
    rules: [string],
    prize: [number]
    coordinators: ICoordinator[]
}


const EventCoordinatorSchema = new Schema<IEventCoordinator>({
    eventId: { type: String, required: true,unique:true },
    eventName: { type: String, required: true },
    participationNo:{type:String,required:true},
    description: { type: String, required: true },
    club: { type: String, required: true },
    regFee: { type: Number, required: true },
    lastRegDate: { type: Date, required: true },
    posterLink: { type: String, required: true },
    rules: { type: [String] },
    prize: { type: [Number] },
    coordinators: { type: [CoordinatorSchema] },
}, { timestamps: true })

export const EventCoordinator = model<IEventCoordinator>("EventCoordinator", EventCoordinatorSchema)

