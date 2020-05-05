import React from 'react'
import './App.css'
import PostMessages from './components/PostMessages'
import { Container, AppBar, Typography } from '@material-ui/core'
import ButterToast, { POS_RIGHT, POS_TOP } from 'butter-toast'

const App = () => {
    return (
        <Container maxWidth='lg'>
            <AppBar position='static' color='inherit'>
                <Typography variant='h2' align='center'>
                    Post Box
                </Typography>
            </AppBar>
            <PostMessages />
            <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
            ></ButterToast>
        </Container>
    )
}

export default App
