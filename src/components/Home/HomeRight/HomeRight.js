import React from 'react'
import './HomeRight.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Expenses from '../../Expenses/Expenses';
import Divider from '@mui/material/Divider';
import WalletIcon from '../../assets/wallet.png'
import HomeRightBottom from './HomeRightBottom/HomeRightBottom';
import ExpenseModal from '../../Expenses/ExpenseModal/ExpenseModal';

const HomeRight = () => {
    // const [open, setOpen] = React.useState(false);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    return (
        <div className='homeRight'>
            <div className='homeRight__container'>
                <div className='homeRight__container1'>
                    <CalendarMonthIcon /> <h4>Your Transaction History</h4>
                </div>
                <Divider />
                <div className='homeRight__container2'>
                    <Expenses />

                </div>
                <Divider />
                <div className='homeRight__container3'>
                    <HomeRightBottom />
                    <ExpenseModal />
                </div>
            </div>
        </div>
    )
}

export default HomeRight