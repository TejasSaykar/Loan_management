const EMIModel = require("../models/EMIModel");
const userModel = require("../models/userModel");
const Transaction = require("../models/Transaction");
const moment = require("moment");

const cron = require('node-cron');

exports.EMI = async (req, res) => {
    const arrayData = req.body;
    let emi;
    let result;

    const periodInDays = 365;
    const periodInWeeks = 52;
    const currentDate = new Date();

    const emiResults = [];
    let AlluserData = [];

    try {
        for (const user of arrayData)
        // const user = arrayData[0]
        {
            let userData = await userModel.findById({ _id: user._id });// Get from db

            console.log('-------user---------', userData)
            if (userData) {

                const { enteredEmiAmount } = user;// Entered amt

                console.log('userData.lastEMIDate ===moment().toDate()', userData.lastEMIDate + '===' + moment().toDate())
                if (userData.lastEMIDate != undefined && (userData.lastEMIDate === moment().toDate())) {
                    console.log("---------Update")
                    // Update
                    // accept EMI
                    if (enteredEmiAmount == userData.lastEMIAmount) {
                        continue;// skip for this user, because same amount enter so no need to modify
                    }

                    // reset previous enrty
                    if (userData.lastEMIAmount > userData.penaltyAmount) {
                        userData.totalPenalty -= userData.penaltyAmount;// reset prevoius emi amt
                        userData.EMIBounceCount -= 1;// reset previous amt

                    } else {
                        userData.totalEMIAmount -= userData.lastEMIAmount;// reset prevoius emi amt
                        userData.totalEMICount -= 1;// reset emi count 
                        userData.lastEMIAmount = 0;// reset previous amt
                    }

                    //endReset


                    if (enteredEmiAmount === 0) {

                        userData.totalPenalty += userData.penaltyAmount;
                        userData.EMIBounceCount += 1;
                        userData.lastEMIAmount = 0;

                    } else {
                        if (enteredEmiAmount == userData.emiAmount) {
                            console.log('userData.emiAmount', userData.emiAmount)
                            userData.totalEMIAmount += userData.emiAmount;
                            userData.totalEMICount += 1;
                            userData.lastEMIDate = moment().toDate();// no need
                            userData.lastEMIAmount = enteredEmiAmount;
                        } else {
                            if (enteredEmiAmount > userData.emiAmount) {
                                userData.totalEMIAmount += userData.emiAmount;
                                userData.totalEMICount += 1;
                                userData.lastEMIDate = moment().toDate();
                                userData.lastEMIAmount = userData.emiAmount;

                                userData.advanceAmount += enteredEmiAmount - userData.emiAmount;
                                //add in advance
                            } else {
                                // if entered data is minimum than emiAmount
                                if ((userData.advanceAmount + enteredEmiAmount) >= userData.emiAmount) {
                                    userData.totalEMIAmount += userData.emiAmount;
                                    userData.totalEMICount += 1;
                                    userData.lastEMIDate = moment().toDate();

                                    userData.advanceAmount = (userData.advanceAmount + enteredEmiAmount) - userData.emiAmount;
                                    //removed from advance

                                } else {
                                    userData.totalPenalty += userData.penaltyAmount;
                                    userData.EMIBounceCount += 1;
                                    userData.lastEMIDate = moment().toDate();

                                    userData.advanceAmount += enteredEmiAmount - userData.emiAmount;
                                    //add in advance
                                }
                            }
                        }
                    }
                    totalEMIAmount = parseInt(EMI) - (parseInt(userData.lastEMIAmount) + (parseInt(enteredEmiAmount)));

                }
                else {
                    // Insert
                    if (enteredEmiAmount === 0) {
                        if ((userData.advanceAmount + enteredEmiAmount) >= userData.emiAmount) {
                            ///pending
                        }
                        else {
                            userData.totalPenalty += userData.penaltyAmount;
                            userData.EMIBounceCount += 1;
                            userData.lastEMIDate = moment().toDate();
                        }
                    } else {


                        if (enteredEmiAmount == userData.emiAmount) {
                            userData.totalEMIAmount = userData.totalEMIAmount + userData.emiAmount;
                            userData.totalEMICount += 1;
                            userData.lastEMIDate = moment().toDate();
                            userData.lastEMIAmount = userData.emiAmount;

                        } else {
                            if (enteredEmiAmount > userData.emiAmount) {
                                userData.totalEMIAmount += userData.emiAmount;
                                userData.totalEMICount += 1;
                                userData.lastEMIDate = moment().toDate();

                                userData.advanceAmount += enteredEmiAmount - userData.emiAmount;
                                //add in advance
                            } else {
                                // if entered data is minimum than emiAmount
                                if ((userData.advanceAmount + enteredEmiAmount) >= userData.emiAmount) {
                                    userData.totalEMIAmount += userData.emiAmount;
                                    userData.totalEMICount += 1;
                                    userData.lastEMIDate = moment().toDate();

                                    userData.advanceAmount = (userData.advanceAmount + enteredEmiAmount) - userData.emiAmount;
                                    //removed from advance

                                } else {
                                    userData.totalPenalty += userData.penaltyAmount;
                                    userData.EMIBounceCount += 1;
                                    userData.lastEMIDate = moment().toDate();

                                    userData.advanceAmount += enteredEmiAmount;
                                    //add in advance
                                }
                            }
                        }
                    }

                }
                console.log('----', userData)

                AlluserData.push(userData)
            }
            else {
                // return user not found
                // res.status(404).json({
                //     success: true,
                //     message: "User Not Found",
                //     userData,
                //     emi
                // });
                // console.log('user not found ', userData)
            }
            // TODO const PendingEMINumber = previousEMI ? previousEMI.penalty : 0;
            AlluserData.push(userData);
            result = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: userData }, { new: true });

            // console.log("Previous Penalty : ", previousPenalty);

            // const newAmount = parseInt(previousPenalty) + (parseInt(emiAmount) || 0);

            // result = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { totalPenalty: Number(newAmount) } }, { new: true });

            // emi = await EMIModel.findOneAndUpdate({ userId }, { $set: { userId, emiAmount, currentDate, penalty: newAmount } }, { upsert: true });
            // Paid penalty


        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            AlluserData,
            result,
            emi
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while calculating the EMI",
            error
        })
    }
}


// cron.schedule('*/4 * * * * *', () => {
//     console.log("Running");
//     EMI();
// })


