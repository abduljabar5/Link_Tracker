
import  {Schema, model,models} from "mongoose";

const linkSchema = new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    originalUrl: String,
    genteratedLink: String,
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    timestamp: Date,
    ipAddress: String,
});
const Link = models.Link || model('Link', linkSchema);

export default Link;
