const categoryModel = require('./../../models/category')
const categoryValidate = require('../../validators/categoryValidate')
const {isValidObjectId} = require("mongoose");
const {getAll} = require("./user");


exports.create = async (req, res) => {
    const categoryValidation = categoryValidate(req.body)


    if (categoryValidation !== true) {
        return res.status(422).json(categoryValidation)
    }

    const {title, href} = req.body
    const category = await categoryModel.create({title, href})

    return res.status(201).json(category)
}

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({})

    return res.status(200).json(categories)
}

exports.remove = async (req, res) => {
    const validCatId = isValidObjectId(req.params.id)

    if (!validCatId) {
        return res.status(409).json({
            message: 'catId is not valid'
        })
    }
    const removeCategory = await categoryModel.findByIdAndDelete({
        _id: req.params.id
    })
    if (!removeCategory) {
        return res.status(404).json({
            message: "category not found"
        })
    }
    return res.status(200).json({
        message: "category deleted Successfully"
    })
}

exports.update = async (req, res) => {
    const id = req.params.id
    const {title, href} = req.body

    const updateCategory = await categoryModel.findByIdAndUpdate(
        {_id: id},
        {title, href},
        {new: true}
    ).lean()
    if(!updateCategory)
        return  res.status(422).json({
            message:'Category not found'
        })
    return res.json(updateCategory)

}