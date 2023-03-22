import Product from "../models/product";
import joi from "joi";

const productSchema = joi.object({
    name:joi.string().min(3).required(),
    price:joi.number().positive().required(),
    desc: joi.string().min(3).required(),
    status:joi.boolean().required()

})


export const getAll = async(req,res) =>{
    try {
        const products = await Product.find();

        if(products === 0){
            res.status(400).json({
                message:"not found product"
            })
        }
        return res.status(200).json({
            data:products,
        })
    } catch (error) {
        return res.status(500).json({
            message:"error",
        })
    }
}


export const get = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            res.status(400).json({
                message:"not found product"
            })
        }
        return res.status(200).json({
            data:product,
        })
    } catch (error) {
        return res.status(500).json({
            message:"error",
        })
    }
}

export const create = async(req,res) =>{
    try {
        const {error} = productSchema.validate(req.body);
        if(error){
            res.status(400).json({
                message:error.details[0].message,
            })
        }
        const products = await Product.create(req.body);

        return res.status(200).json({
            message:"Create product succesful",
            data:products,
        })
    } catch (error) {
        return res.status(500).json({
            message:"error",
        })
    }
}

export const remove = async(req,res) =>{
    try {
        const products = await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"Delete product succesful !",
        })
    } catch (error) {
        return res.status(500).json({
            message:"error",
        })
    }
}

export const update = async(req,res) =>{
    try {
        const {error} = productSchema.validate(req.body);
        if(error){
            res.status(400).json({
                message:error.details[0].message,
            })
        }
        const products = await Product.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});

        return res.status(200).json({
            message:"Update product succesful",
            data:products,
        })
    } catch (error) {
        return res.status(500).json({
            message:"error",
        })
    }
}
