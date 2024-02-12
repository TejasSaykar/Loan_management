import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SideNav from '../components/SideNav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditUser = () => {

    const id = useParams().id;

    const [singleUser, setSingleUser] = useState({});

    const [check, setCheck] = useState(false);
    console.log(check);

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/single-user/${id}`);
                if (data) {
                    // console.log("Single user : ", data.user);
                    setSingleUser(data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleUser();
    }, [id])

    return (
        <Box component={ "div" } sx={ { display: "flex", bgcolor: "#F8F5F5", height: 90 + "vh" } }>
            <SideNav />
            <Box sx={ { flexGrow: 1, p: 3 } }>
                <TableContainer component={ Paper }>
                    <Grid display={ "flex" } justifyContent={ "center" } sx={ { my: 2 } }>
                        <Typography variant='h5' color={ "gray" } sx={ { fontWeight: "bold" } }>
                            Edit User
                        </Typography>
                    </Grid>
                    <form>
                        <Table sx={ { minWidth: 700 } } aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={ { fontWeight: "bold" } }>Name</TableCell>
                                    <TableCell sx={ { fontWeight: "bold" } } align="right">Loan Amount</TableCell>
                                    <TableCell sx={ { fontWeight: "bold" } } align="right">EMI Status</TableCell>
                                    <TableCell sx={ { fontWeight: "bold" } } align="right">Date</TableCell>
                                    <TableCell sx={ { fontWeight: "bold" } } align="right">Check Paid User</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell>{ singleUser.fullname }</TableCell>
                                    <TableCell align="right">{ singleUser.loanAmount }</TableCell>
                                    <TableCell align="right">{ "Paid" }</TableCell>
                                    <TableCell align="right">{ new Date(singleUser.createdAt).toLocaleDateString() }</TableCell>
                                    <TableCell align="right">
                                        <Checkbox onChange={ (e) => setCheck(e.target.checked) } />
                                    </TableCell>
                                </TableRow>
                                <Box>
                                    <Button variant='contained' sx={ { m: 2 } }>Submit</Button>
                                </Box>
                            </TableBody>
                        </Table>
                    </form>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default EditUser
