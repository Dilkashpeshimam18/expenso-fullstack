import React, { useState, useEffect } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
const Home = ({ open, setOpen, isUpdated }) => {
    useEffect(() => {
        if (isUpdated == false) {
            setOpen(true)
        }
    }, [])

    return (
        <div><h1>Welcome to Expense Tracker</h1>
            {open == true && <ProfileModal open={open} setOpen={setOpen} />}

        </div>
    )
}

export default Home