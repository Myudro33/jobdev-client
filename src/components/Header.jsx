import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth_components/Auth'
import { UseMainContext } from '../../context'
import userdefault from '../assets/photos/userdefault.jpg'
import Filter from './Filter'
import UserDropDown from './UserDropDown'
import { BsSearchHeart } from 'react-icons/bs'
import { MdFilterList, MdZoomOutMap, MdZoomInMap } from 'react-icons/md'

const Header = () => {
  const {
    DispatchAuth,
    StateAuth,
    userResumeData,
    zoomIn,
    setZoomIn,
  } = UseMainContext()
  const style = {
    mainDiv: `${
      zoomIn ? '' : 'rounded-[50px]'
    } relative  headerColor h-[6rem] p-10    flex items-center justify-around  text-gray-100  shadow-md  `,
  }
  const showFitlerMenu = () => {
    setFilterDisplay(true)
  }
  const hideFilterMenu = () => {
    setFilterDisplay(false)
  }
  const [profileDrop, setProfileDrop] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const navigation = useNavigate()
  return (
    <div className={style.mainDiv}>
      <div
        className="h-full flex items-center "
        onMouseEnter={showFitlerMenu}
        onMouseLeave={hideFilterMenu}
      >
        <button className="flex  items-center font-mono justify-around w-[9rem] text-[1.4rem]">
          <MdFilterList className="text-[2rem]" />
          Filter
        </button>
      </div>
      <button
        onClick={() => navigation('/')}
        className="text-4xl font-mono	 font-mono flex items-center justify-around"
      >
        FindDev <BsSearchHeart />
      </button>
      {!StateAuth.userData.sub ? (
        <button
          onClick={() => DispatchAuth({ type: 'AUTH_POP_UP', payload: true })}
        >
          Register
        </button>
      ) : (
        <div
          className="bg-yellow-400 p-[2px] rounded-[50%] cursor-pointer relative"
          onClick={() => setProfileDrop(!profileDrop)}
        >
          <img
            className="w-[50px] h-[50px] rounded-[50%]"
            src={
              userResumeData &&
              userResumeData[0] &&
              userResumeData[0]?.picturePath
                ? userResumeData[0]?.picturePath
                : userdefault
            }
          />
          {profileDrop && (
            <UserDropDown
              id={
                userResumeData && userResumeData[0] && userResumeData[0].owner
              }
              img={
                userResumeData &&
                userResumeData[0] &&
                userResumeData[0]?.picturePath
                  ? userResumeData[0]?.picturePath
                  : userdefault
              }
            />
          )}
        </div>
      )}
      <div
        onClick={() => setZoomIn(!zoomIn)}
        className="absolute text-[2rem] flex items-center justify-center cursor-pointer right-10"
      >
        <MdZoomInMap
          title="Zoom in"
          className="hover:text-[2.5rem]  transition-all duration-300"
        />
      </div>
      <Auth />
      {filterDisplay && (
        <Filter onMouseEnter={showFitlerMenu} onMouseLeave={hideFilterMenu} />
      )}
    </div>
  )
}

export default Header
