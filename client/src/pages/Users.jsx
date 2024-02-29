import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const inputRef = useRef(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/all-users`
      );
      if (data) {
        setUsers(data.users);
        // console.log(data.users);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (event, index) => {
    const { value, name } = event.target;
    const updatedUsers = [...users]; // Assuming users is your state variable containing the array of user objects
    updatedUsers[index] = {
      ...updatedUsers[index],
      [name]: parseInt(value),
    };
    setUsers(updatedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Users data : ", users);
    message.success("Emi updated");
    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/emi/calculate-emi`, users)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        fetchUser();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredUsers = selectedDate
    ? users.filter(
        (user) =>
          new Date(user.createdAt).toDateString() ===
          new Date(selectedDate).toDateString()
      )
    : users;

  if (loading) {
    return (
      <Box sx={{ mx: 3, mt: 20 }}>
        <Card>
          <CardContent>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Loading....</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }

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
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} justifyContent={"space-between"} px={2}>
                <Box display={"flex"} alignItems={"center"}>
                  <InputLabel htmlFor="datePicker">Select Date: </InputLabel>
                  <TextField
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    capture="environment"
                  />
                </Box>
                {selectedDate && (
                  <Box>
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{
                        py: 1,
                        "&:hover": {
                          bgcolor: "green",
                          color: "white",
                        },
                      }}
                      size="small"
                      onClick={() => setSelectedDate("")}
                    >
                      All Users <ExpandMoreIcon />{" "}
                    </Button>
                  </Box>
                )}
              </Box>
              <Table
                sx={{ width: 100 + "%", overflowX: "scroll" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Laon Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Pay Instalment Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Instalment Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Total Penalty
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Advance
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Action
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
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
                    {filteredUsers.length === 0 && (
                      <h2>No users are availbale for this date</h2>
                    )}
                  </div>
                  {(selectedDate ? filteredUsers : users).map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{user.fullname}</TableCell>
                      <TableCell align="left">{user.loanAmount}</TableCell>
                      <TableCell align="left">
                        {user.EMIType === "day" ? 50 : 100}
                      </TableCell>
                      <TableCell
                        align="left"
                        // sx={{ display: "flex", alignItems: "center" }}
                      >
                        {/* {user.emiAmount} */}
                        <TextField
                          type="number"
                          name="enteredEmiAmount"
                          ref={inputRef}
                          // value={user.emiAmount}
                          sx={{ width: "50%" }}
                          onChange={(e) => {
                            console.log("Value changing to : ", e.target.value),
                              handleInputChange(e, index);
                          }}
                        />
                      </TableCell>
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
                      <TableCell align="left">{user.instalmentType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredUsers.length !== 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained" sx={{ m: 2 }}>
                    Submit
                  </Button>
                </Box>
              )}
            </form>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Users;
