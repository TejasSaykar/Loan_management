import React, { useState } from "react";
import SideNav from "../components/SideNav";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";

const UserRegistration = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    address: "",
    loanAmount: "",
    EMIType: "",
    emiAmount: "",
    penaltyAmount: "",
    advanceAmount: "",
    guaranteePerson1: "",
    guaranteePerson2: "",
    guaranteePerson1Address: "",
    guaranteePerson2Address: "",
    nomineeName: "",
    nomineeAddress: "",
    refferalName: "",
    guaranteePerson1Phone: "",
    guaranteePerson2Phone: "",
    nomineePhone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (true) {
      case !inputs.fullname:
        message.error("Fullname is required");
        return;
      case !inputs.address:
        message.error("Address is required");
        return;
      case !inputs.loanAmount:
        message.error("Laon amount is required");
        return;
      case !inputs.guaranteePerson1:
        message.error("Guarantee person 1 name is required");
        return;
      case !inputs.guaranteePerson2:
        message.error("Guarantee person 2 is required");
        return;
      case !inputs.guaranteePerson1Address:
        message.error("Guarantee person 1 address is required");
        return;
      case !inputs.guaranteePerson2Address:
        message.error("Guarantee person 2 address is required");
        return;
      case !inputs.nomineeName:
        message.error("Nominee name is required");
        return;
      case !inputs.nomineeAddress:
        message.error("Nominee address  is required");
        return;
      case !inputs.refferalName:
        message.error("Refferal name is required");
        return;
      case !inputs.guaranteePerson1Phone:
        message.error("Guarantee person 1 phone is required");
        return;
      case !inputs.guaranteePerson2Phone:
        message.error("Guarantee person 2 phone is required");
        return;
      case !inputs.nomineePhone:
        message.error("Nominee phone is required");
        return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/user-registration`,
        {
          fullname: inputs.fullname,
          address: inputs.address,
          loanAmount: inputs.loanAmount,
          EMIType: inputs.EMIType,
          emiAmount: inputs.emiAmount,
          penaltyAmount: inputs.penaltyAmount,
          advanceAmount: inputs.advanceAmount,
          guaranteePerson1: inputs.guaranteePerson1,
          guaranteePerson2: inputs.guaranteePerson2,
          guaranteePerson1Address: inputs.guaranteePerson1Address,
          guaranteePerson2Address: inputs.guaranteePerson2Address,
          nomineeName: inputs.nomineeName,
          nomineeAddress: inputs.nomineeAddress,
          refferalName: inputs.refferalName,
          guaranteePerson1Phone: inputs.guaranteePerson1Phone,
          guaranteePerson2Phone: inputs.guaranteePerson2Phone,
          nomineePhone: inputs.nomineePhone,
        }
      );
      if (data) {
        console.log(data);
        message.success("Registration Successfully");
        setInputs({
          fullname: "",
          address: "",
          loanAmount: "",
          EMIType: "",
          guaranteePerson1: "",
          guaranteePerson2: "",
          guaranteePerson1Address: "",
          guaranteePerson2Address: "",
          nomineeName: "",
          nomineeAddress: "",
          refferalName: "",
          guaranteePerson1Phone: "",
          guaranteePerson2Phone: "",
          nomineePhone: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#F8F5F5" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Card
              sx={{
                maxWidth: 100 + "%",
                alignContent: "center",
                paddingTop: "5px",
              }}
            >
              <CardContent>
                <Grid display={"flex"} justifyContent={"center"} sx={{ mb: 1 }}>
                  <Typography variant="h4" color={"gray"}>
                    User Registration
                  </Typography>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.fullname}
                      onChange={(e) =>
                        setInputs({ ...inputs, fullname: e.target.value })
                      }
                      label="Full Name"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.address}
                      onChange={(e) =>
                        setInputs({ ...inputs, address: e.target.value })
                      }
                      label="Address"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="number"
                      min="0"
                      value={inputs.loanAmount}
                      onChange={(e) =>
                        setInputs({ ...inputs, loanAmount: e.target.value })
                      }
                      label="Loan Amount"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <InputLabel id="demo-simple-select-label" sx={{ ml: 0.2 }}>
                      EMIType
                    </InputLabel>
                    <Select
                      variant="standard"
                      required
                      value={inputs.EMIType}
                      label="Age"
                      sx={{ width: 100 + "%" }}
                      onChange={(e) =>
                        setInputs({ ...inputs, EMIType: e.target.value })
                      }
                    >
                      <MenuItem value={"day"}>Day</MenuItem>
                      <MenuItem value={"week"}>Week</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      id="standard-basic"
                      type="number"
                      value={inputs.emiAmount}
                      required
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          emiAmount: e.target.value,
                        })
                      }
                      label="Emi Amount"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={inputs.penaltyAmount}
                      label="Penalty"
                      sx={{ width: 100 + "%" }}
                      required
                      onChange={(e) =>
                        setInputs({ ...inputs, penaltyAmount: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid>
                  <TextField
                  type="number"
                    variant="outlined"
                    value={inputs.advanceAmount}
                    required
                    label="Advanced"
                    sx={{ width: 100 + "%", mb: 2 }}
                    onChange={(e) =>
                      setInputs({ ...inputs, advanceAmount: e.target.value })
                    }
                  />
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.guaranteePerson1}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson1: e.target.value,
                        })
                      }
                      label="Guarantee Person 1 Name"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.guaranteePerson2}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson2: e.target.value,
                        })
                      }
                      label="Guarantee Person 2 Name"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="number"
                      value={inputs.guaranteePerson1Phone}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson1Phone: e.target.value,
                        })
                      }
                      label="Guarantee Person 1 Phone"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="number"
                      value={inputs.guaranteePerson2Phone}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson2Phone: e.target.value,
                        })
                      }
                      label="Guarantee Person 2 Phone"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.guaranteePerson1Address}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson1Address: e.target.value,
                        })
                      }
                      label="Guarantee Person 1 Address"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.guaranteePerson2Address}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          guaranteePerson2Address: e.target.value,
                        })
                      }
                      label="Guarantee Person 2 Address"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.nomineeName}
                      onChange={(e) =>
                        setInputs({ ...inputs, nomineeName: e.target.value })
                      }
                      label="Nominee Name"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.nomineeAddress}
                      onChange={(e) =>
                        setInputs({ ...inputs, nomineeAddress: e.target.value })
                      }
                      label="Nominee Address"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  sx={{ flexGrow: 1, marginBottom: "10px" }}
                >
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="number"
                      value={inputs.nomineePhone}
                      onChange={(e) =>
                        setInputs({ ...inputs, nomineePhone: e.target.value })
                      }
                      label="Nominee Phone"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                  <Grid item sm={12} lg={6}>
                    <TextField
                      required
                      id="standard-basic"
                      type="text"
                      value={inputs.refferalName}
                      onChange={(e) =>
                        setInputs({ ...inputs, refferalName: e.target.value })
                      }
                      label="Refferal Name"
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </CardContent>
            </Card>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default UserRegistration;
