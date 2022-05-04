import { Schema } from "mongoose"

export interface ICoordinator {
    name: string,
    email: string,
    phone: string,
    image: string,
}

export const CoordinatorSchema = new Schema<ICoordinator>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String,  },
})