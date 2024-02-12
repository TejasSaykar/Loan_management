const EMIModel = require("../models/EMIModel");

exports.EMI = async (req, res) => {
    const dataArray = req.body;
    return console.log("Array Of Objects : ",dataArray)
    try {
        const userEmi = await new EMIModel({
            userId, EMIAmount, currentDate, isPaid, penaltyAmount, totalPenalty
        }).save();

        return res.status(200).json({
            success: true,
            message: "EMI User",
            userEmi
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while calculating the EMI",
            error
        })
    }
}