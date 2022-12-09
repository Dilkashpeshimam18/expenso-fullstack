import React, { useEffect } from 'react'
import './Header.css'
import Logout from '../Logout/Logout'
import ProfileModal from '../ProfileModal/ProfileModal'
import VerifyEmail from '../VerifyEmail/VerifyEmail'
import { useSelector, useDispatch } from 'react-redux'
import { themeActions } from '../../store/slice/theme-slice'
import ReactSwitch from 'react-switch'
const Header = ({ open, setOpen, isUpdated }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch(themeActions.toggleTheme())
        console.log(theme)
    }
    const theme = useSelector(state => state.theme.theme)
    // useEffect(() => {
    //     if (isUpdated == false) {
    //         setOpen(true)
    //     }
    // }, [])
    return (
        <div className='header'>
            <div className='header__container'>
                <div className='header__left'>
                    <h2>Expenso</h2>
                </div>
                <div className='header__right'>
                    <div className='header__rightSub'>
                        <ReactSwitch onChange={handleToggle} checked={theme == 'dark'} />

                    </div>

                    {userToken && <>
                        {open == true && <ProfileModal open={open} setOpen={setOpen} />}
                        <div className='header__rightSubLink'>
                            <VerifyEmail />


                        </div>
                        <div className='header__rightSubLink'>
                            <Logout />

                        </div>
                    </>


                    }
                </div>
            </div>

        </div>
    )
}

export default Header