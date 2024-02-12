const userModel = require("../models/userModel");


// Register User
exports.userRegistration = async (req, res) => {
    const { fullname, address, loanAmount, EMIType, guaranteePerson1, guaranteePerson2, guaranteePerson1Address, guaranteePerson2Address, nomineeName, nomineeAddress, refferalName, startEMI, endEMI, isPaid,guaranteePerson1Phone, guaranteePerson2Phone, nomineePhone } = req.body;
    try {
        const user = await userModel({
            fullname, address, loanAmount, EMIType, guaranteePerson1, guaranteePerson2, guaranteePerson1Address, guaranteePerson2Address, nomineeName, nomineeAddress, refferalName, startEMI, endEMI, isPaid, guaranteePerson1Phone, guaranteePerson2Phone, nomineePhone
        }).save();

        return res.status(200).json({
            success: true,
            message: "User Registration Successful",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while registration",
            error
        })
    }
}


// Get all Users
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).json({
            success: true,
            message: "All users are getting",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the users",
            error
        })
    }
}


// Get Single user
exports.getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Single user is getting",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the single user",
            error
        })
    }
}