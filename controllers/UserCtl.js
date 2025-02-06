const { log } = require('console')
const UserModel = require('../model/UserModel')

module.exports.home = async (req, res) => {
    try {
        const UserData = await UserModel.find()
        return res.status(200).json({ msg: 'HEllo', data: UserData })
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })

    }
}
module.exports.AddData = async (req, res) => {
    try {
        console.log(req.body)
        let UserData = await UserModel.create(req.body)
        if (UserData) {
            return res.status(200).json({ msg: 'Mongo DB Data added successfully', data: req.body })
        }
        else {
            return res.status(200).json({ msg: 'Failed to add data to MongoDB' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })

    }
}
module.exports.deleteData = async (req, res) => {
    try {
        let delData = await UserModel.findById(req.params.id)
        if (delData) {
            await UserModel.findByIdAndDelete(req.params.id)
            return res.status(200).json({ msg: 'Data deleted successfully', data: delData })
        }
        else {
            return res.status(200).json({ msg: 'No data found to delete' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}
module.exports.getsingledata = async (req, res) => {
    try {
        let singalData = await UserModel.findById(req.params.id)
        if (singalData) {
            return res.status(200).json({ msg: 'record Founded succefully', data: singalData })
        }
        else {
            return res.status(200).json({ msg: 'Record Not found' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}
module.exports.updateData = async (req, res) => {
    try {
        let checkData = await UserModel.findById(req.params.id)
        if (checkData) {
            let updateData = await UserModel.findByIdAndUpdate(checkData._id, req.body)
            if (updateData) {
                let updatedData = await UserModel.findById(req.params.id)
                return res.status(200).json({ msg: 'record Updated succefully', data: updatedData })
            }
            else {
                return res.status(200).json({ msg: 'Record Not Updated' })
            }
        }
        else {
            return res.status(200).json({ msg: 'Record Not found' })
        }
    }
    catch (err) {
        return res.status(400).json({ msg: 'Somthing Wrong', data: err })
    }
}