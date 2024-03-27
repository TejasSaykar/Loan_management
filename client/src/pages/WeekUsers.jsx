import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SideNav from "../components/SideNav";
import axios from "axios";

const WeekUsers = () => {
  const [weekUsers, setWeekUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/week-user/week`
        );
        if (data) {
          //   console.log("Day Data : ", data.dayUser);
          setWeekUsers(data.weekUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#F8F5F5",
          height: 100 + "%",
          width: 100 + "%",
        }}
      >
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Grid display="flex" justifyContent={"center"} sx={{ my: 2 }}>
              <Typography variant="h4" color={"gray"}>
                Users
              </Typography>
            </Grid>
            <form>
              <Table
                sx={{ width: 100 + "%", overflowX: "scroll" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Laon Amount
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Pay Instalment Amount
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Instalment Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Total Penalty
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Advance
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Action
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      width: "100%",
                      margin: "auto",
                      justifyContent: "center",
                      padding: "5px 0px",
                    }}
                  >
                    {weekUsers.length === 0 && (
                      <h2>No users are availbale for this date</h2>
                    )}
                  </div>
                  {weekUsers.map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{user.fullname}</TableCell>
                      <TableCell align="left">{user.loanAmount}</TableCell>
                      <TableCell align="left">
                        {user.EMIType === "day" ? 50 : 100}
                      </TableCell>
                      {/* <TableCell
                        align="left"
                      >
                        <TextField
                          type="number"
                          name="enteredEmiAmount"
                          // value={user.emiAmount}
                          sx={{ width: "50%" }}
                          onChange={(e) => {
                            console.log("Value changing to : ", e.target.value),
                              handleInputChange(e, index);
                          }}
                        />
                      </TableCell> */}
                      <TableCell align="left">{user.totalPenalty}</TableCell>
                      <TableCell align="left">{user.advanceAmount}</TableCell>
                      {/* <TableCell>
                        <Link
                          to={`/edit-user/${user._id}`}
                          style={{
                            textDecoration: "underline",
                            marginLeft: "5px",
                          }}
                        >
                          View user
                        </Link>
                      </TableCell> */}
                      <TableCell align="left">
                        {user.EMIType === "day" ? "Day" : "Week"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* {dayUsers.length !== 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained" sx={{ m: 2 }}>
                    Submit
                  </Button>
                </Box>
              )} */}
            </form>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default WeekUsers;
