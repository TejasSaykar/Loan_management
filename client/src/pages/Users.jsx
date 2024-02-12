import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Grid,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
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
    fetchUser();
  }, []);

  // const handleInputChange = (rowId, propertyName, value) => {
  //     setUpdatedData((prevData) => {
  //         const newData = [...prevData];
  //         newData[rowId] = { ...newData[rowId], [propertyName]: value };
  //         return newData;
  //     });
  // };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedRowData = [...users];
    updatedRowData[index][name] = value;
    setUsers(updatedRowData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Users data : ", users);
    message.success("Emi updated");
    axios
      .put(`${import.meta.env.VITE_BASE_URL}/api/emi/calculate-emi`, users)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        const clearedUserData = rowData.map((row) => ({
          ...row,
          emi: "",
        }));
        setUsers(clearedUserData);
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
                <Box
                //   sx={{
                //     border: "1px solid gray",
                //     width: "max-content",
                //     p: 2,
                //     cursor: "pointer",
                //   }}
                //   id="datePicker"
                //   onClick={() => console.log("clicked")}
                >
                  <label htmlFor="datePicker">Select Date: </label>
                  <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    capture="environment"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      padding: "4px 4px",
                      cursor: "pointer",
                    }}
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
                      Total EMI Paid
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Action
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
                      <TableCell align="right">{user.fullname}</TableCell>
                      <TableCell align="right">{user.loanAmount}</TableCell>
                      <TableCell align="right">
                        {user.EMIType === "day" ? 50 : 100}
                      </TableCell>
                      <TableCell align="right">
                        {/* <Checkbox
                          onChange={() => handleCheckboxClick(user._id)}
                        /> */}
                        <TextField
                          type="text"
                          name="emiAmount"
                          ref={inputRef}
                          value={user.EMIAmout}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </TableCell>
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
