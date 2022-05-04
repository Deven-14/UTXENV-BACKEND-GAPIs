import mongoose, { Schema, model } from "mongoose"
import { ICoordinator, CoordinatorSchema } from "../types/coordinator"


export interface IClubCoordinator {
    _id: mongoose.Types.ObjectId,
    clubName: string,
    description: string,
    clubId:string,
    logo: string,
    sponserLink: string,
    socials: string[]
    coordinators: ICoordinator[]
}

const ClubCoordinatorSchema = new Schema<IClubCoordinator>({
    clubName: { type: String, required: true },
    clubId: {type:String,required:true,unique:true},
    description: { type: String, required: true },
    logo: { type: String, required: true },
    sponserLink: { type: String, required: true },
    socials: { type: [String] },
    coordinators: { type: [CoordinatorSchema] },
}, { timestamps: true })

export const ClubCoordinator = model<IClubCoordinator>("ClubCoordinator", ClubCoordinatorSchema)