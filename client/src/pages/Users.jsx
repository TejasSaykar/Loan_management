import React, { useEffect, useState } from 'react'
import { Box, Button, CardContent, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import SideNav from '../components/SideNav'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Card } from 'antd'


const Users = () => {

    const [users, setUsers] = useState([]);

    const [updatedData, setUpdatedData] = useState([]);
    console.log("Updated Data", updatedData);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/all-users`);
                if (data) {
                    setUsers(data.users);
                    // console.log(data.users);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    // const handleChange = (e,rowId) => {
    //     if (selectedRows.includes(rowId)) {
    //         setSelectedRows(selectedRows.filter(row => row._id !== rowId));
    //     } else {
    //         const selectedRowData = users.find(row => row._id === rowId);
    //         setSelectedRows([...selectedRows, selectedRowData]);
    //     }

    //     setSelectedRows((prev) => (
    //         [...prev, ]
    //     ))
    // };

    const handleInputChange = (rowId, propertyName, value) => {
        setUpdatedData((prevData) => {
            const newData = [...prevData];
            newData[rowId] = { ...newData[rowId], [propertyName]: value };
            return newData;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdatedData((prev) => (
                prev.map(item => (
                    item._id === updatedData._id ? { ...item, EMIAmout: valueToUpdate, userId: item._id } : item
                ))
            ));
        } catch (error) {
            console.log(error);
        }

        // try {
        //     const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/emi/calculate-emi`, selectedRows);
        //     console.log("User Emi : ", data.userEmi);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    if (loading) {
        return (
            <Box sx={ { mx: 3, mt: 20 } }>
                <Card>
                    <CardContent>
                        <Grid display={ "flex" } justifyContent={ "center" } alignItems={ "center" }>
                            <Typography>Loading....</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }

    return (
        <>
            <Box sx={ { display: "flex", bgcolor: "#F8F5F5", height: 100 + "%", width: 100 + "%" } }>
                <SideNav />
                <Box component="main" sx={ { flexGrow: 1, p: 3 } }>

                    <TableContainer component={ Paper }>
                        <Grid display="flex" justifyContent={ "center" } sx={ { my: 2 } }>
                            <Typography variant='h4' color={ "gray" }>
                                Users
                            </Typography>
                        </Grid>
                        <form onSubmit={ handleSubmit }>
                            <Table sx={ { width: 100 + "%", overflowX: "scroll" } } aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={ { fontWeight: "bold" } }>Sr.</TableCell>
                                        <TableCell sx={ { fontWeight: "bold" } } align="right">Name</TableCell>
                                        <TableCell sx={ { fontWeight: "bold" } } align="right">Laon Amount</TableCell>
                                        <TableCell sx={ { fontWeight: "bold" } } align="right">Total EMI Paid</TableCell>
                                        <TableCell sx={ { fontWeight: "bold" } } align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { users?.map((user, index) => (
                                        <TableRow key={ user._id }>
                                            <TableCell component="th" scope="row">
                                                { index + 1 }
                                            </TableCell>
                                            <TableCell align="right">{ user.fullname }</TableCell>
                                            <TableCell align="right">{ user.loanAmount }</TableCell>
                                            <TableCell align="right">{ user.EMIType === "day" ? 50 : 100 }</TableCell>
                                            <TableCell align="right">
                                                {/* <Checkbox
                                                    onChange={ () => handleCheckboxClick(user._id) } /> */}
                                                <TextField
                                                    type='text'
                                                    value={ updatedData[user._id]?.valueToUpdate || '' }
                                                    onChange={ (e) => handleInputChange(user._id, 'valueToUpdate', e.target.value) } />

                                            </TableCell>
                                        </TableRow>
                                    )) }
                                </TableBody>
                            </Table>
                            <Box sx={ { display: "flex", justifyContent: "flex-end" } }>
                                <Button type='submit' variant='contained' sx={ { m: 2 } }>Submit</Button>
                            </Box>
                        </form>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default Users
