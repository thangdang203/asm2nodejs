import Product from '../models/product';
import Category from '../models/category';
import { productSchema } from '../schema/product';

export const getAll = async (req, res) => {
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const products = await Product.paginate({}, options)
        return res.status(201).json(products)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const get = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).populate('categoryId', "products")
        return res.status(201).json(products)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            })
        }
        const product = await Product.create(req.body);
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        return res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const remove = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}