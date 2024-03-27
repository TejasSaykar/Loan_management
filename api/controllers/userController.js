const userModel = require("../models/userModel");

// Register User
exports.userRegistration = async (req, res) => {
  const {
    fullname,
    address,
    loanAmount,
    EMIType,
    penaltyAmount,
    guaranteePerson1,
    guaranteePerson2,
    guaranteePerson1Address,
    guaranteePerson2Address,
    nomineeName,
    nomineeAddress,
    refferalName,
    startEMI,
    endEMI,
    isPaid,
    guaranteePerson1Phone,
    guaranteePerson2Phone,
    nomineePhone,
    emiAmount,
    totalPenalty,
    advanceAmount,
  } = req.body;
  try {
    const user = await new userModel({
      fullname,
      address,
      loanAmount,
      EMIType,
      guaranteePerson1,
      guaranteePerson2,
      guaranteePerson1Address,
      guaranteePerson2Address,
      nomineeName,
      nomineeAddress,
      refferalName,
      startEMI,
      endEMI,
      isPaid,
      guaranteePerson1Phone,
      penaltyAmount,
      guaranteePerson2Phone,
      nomineePhone,
      emiAmount,
      totalPenalty,
      advanceAmount,
    }).save();

    return res.status(200).json({
      success: true,
      message: "User Registration Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while registration",
      error,
    });
  }
};

// Get all Users
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      success: true,
      message: "All users are getting",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the users",
      error,
    });
  }
};

// Get Single user
exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Single user is getting",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single user",
      error,
    });
  }
};

// Get User By Day
exports.getDayUser = async (req, res) => {
  const { day } = req.params;
  try {
    const dayUser = await userModel.find({ EMIType: day });
    return res.status(200).json({
      success: true,
      userCount: dayUser.length,
      message: "Day wise users are getting",
      dayUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the day wise users",
      error,
    });
  }
};

exports.getWeekUser = async (req, res) => {
  const { week } = req.params;
  try {
    const weekUser = await userModel.find({ EMIType: week });
    return res.status(200).json({
      success: true,
      userCount: weekUser.length,
      message: "Week wise users are getting",
      weekUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the week wise users",
      error,
    });
  }
};
