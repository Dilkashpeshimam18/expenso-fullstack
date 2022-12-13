import React from 'react'
import './HomeRightBottom.css'
import WalletIcon from '../../../assets/wallet.png'
const HomeRightBottom = () => {
    return (
        <div className='homeRightBottom'>
            <div className='homeRightBottom__container1' >
                <img style={{ height: '30px', width: '30px', marginRight: '20px', paddingTop: '5px' }} src={WalletIcon} />
                <p className='homeRightBottom__text'>Missing Transaction?</p>

            </div>
            <div className='homeRightBottom__container2'>
                <button className='homeRightBottom__button'>ADD NEW</button>

            </div>

        </div>
    )
}

export default HomeRightBottom