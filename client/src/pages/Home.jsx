import React from 'react'
import SideNav from '../components/SideNav'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import List from '../others/List';

const Home = () => {
    return (
        <>
            <Box sx={ { display: "flex", bgcolor: "#F8F5F5" } }>
                <SideNav />
                <Box component="main" sx={ { flexGrow: 1, p: 3 } }>
                    <List/>
                </Box>
            </Box>
        </>



    )
}

export default Home
