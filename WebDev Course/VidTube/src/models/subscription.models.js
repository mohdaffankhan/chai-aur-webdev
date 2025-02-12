import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {       //ONE WHO IS SUBBSCRIBING
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        channel: {      //ONE to whom SUBSCRIBER is SUBSCRIBING
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);  

export const Subscription = mongoose.model("Subscription", subscriptionSchema);