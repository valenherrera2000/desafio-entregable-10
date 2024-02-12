import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                required: true,
            },
            quantity: Number,
        },
    ],
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
