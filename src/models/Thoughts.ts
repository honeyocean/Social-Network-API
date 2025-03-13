import mongoose,{Schema,Model,Types, type document} from 'mpngoose';

interface IReaction extends Document{
    reactionBody: string;
    reactionId: Types.ObjectId;
    username: string;
    createdAt: Date;
}

interface IThoughts extends Document{
    thoughtText: string;
    createdAt: Date;
    username:string;
    reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        username:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
);

const ThoughtsSchema = new Schema<IThoughts>(
    {
        thoughtText:{
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        username:{
            type: String,
            required: true
        },
        reactions:{
            type: [reactionSchema]
        },
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function(this:IThoughts){
    return this.reactions.length;
});

const Thought: Model<IThoughts> = mongoose.model<IThoughts>('Thought', ThoughtsSchema);
export default Thought;