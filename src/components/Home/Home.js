import React, { useState, useEffect } from 'react'
import Expenses from '../Expenses/Expenses'
import Logout from '../Logout/Logout'
import ProfileModal from '../ProfileModal/ProfileModal'
import VerifyEmail from '../VerifyEmail/VerifyEmail'
import { useDispatch, useSelector } from 'react-redux'
import ReactSwitch from 'react-switch'
import { themeActions } from '../../store/slice/theme-slice'

const Home = ({ open, setOpen, isUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const theme = useSelector(state => state.theme.theme)
    const dispatch = useDispatch()
    // const [userToken, setUserToken] = useState(() => {
    //     return localStorage.getItem('token') || tokenId
    // })

    const handleToggle = () => {
        dispatch(themeActions.toggleTheme())
        console.log(theme)
    }

    useEffect(() => {
        if (isUpdated == false) {
            setOpen(true)
        }
    }, [])

    return (
        <div><h1>Welcome to Expense Tracker</h1>
            {userToken && <>
                {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                <VerifyEmail />
                <Logout />
            </>


            }
            <ReactSwitch onChange={handleToggle} checked={theme == 'dark'} />

            {userToken && <Expenses />}


        </div>
    )
}

export default Home