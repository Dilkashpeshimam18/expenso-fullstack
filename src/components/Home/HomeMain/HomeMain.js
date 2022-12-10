import React from 'react'
import HomeCategory from './Home/HomeCategory/HomeCategory'
import HomeGraph from './Home/HomeGraph/HomeGraph'
import HomeSub from './Home/HomeSub/HomeSub'
import './HomeMain.css'
const HomeMain = () => {
    return (
        <div className='homeMain'>
            <div className='home__subContainer'>
                <HomeSub />
                <HomeSub />
                <HomeSub />
            </div>
            <div className='home__graphContainer'>
                <HomeGraph />
            </div>
            <div className='home__catContainer'>
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />


            </div>
        </div>
    )
}

export default HomeMain