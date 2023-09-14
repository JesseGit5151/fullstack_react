import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import Saves from "./Saves"
import Settings from "./Settings"

import styles from "../assets/styles/profile.module.css"
import ProfilePostCard from './ProfilePostCard'
const Profile = ({ onDeletePost }) => {
  const [activeButton, setActiveButton] = useState('profile');
  const [mainContent, setMainContent] = useState(<ProfilePostCard/>);
  
  //call fetch to retreive personal posts
  //fetch data from /posts route
  const handleButtonClick = (buttonId, content) => {
    setActiveButton(buttonId);
    setMainContent(content);
  };

//   async function getData(query = "") {
//     try {
//       const response = await fetch(
//         `https://yourfavorites-api.onrender.com/posts?query=${query}`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//             "Cache-Control": "no-store",
//           },
//         }
//       )
//       const data = await response.json()
//       console.log(data)
//       setData(data)
//       setIsLoading(false)
//     } catch (error) {
//       console.error("An error occurred:", error)
//     }
//   }
//   useEffect(() => {

//     getData()
// }, [])

// const handleDeletePost = (postId) => {
    
//   onDeletePost(postId)
// }
  return (
    <>
      <Navbar/>
      {/* create a div for the tags: profile - saved - settings */}
      <ul className={styles.subnav}>
        <li id='profile' onClick={() => handleButtonClick('profile', <ProfilePostCard />)}>Profile</li>
        <li id='saves' onClick={() => handleButtonClick('saves', <Saves/>)}>Saves</li>
        <li id='settings' onClick={() => handleButtonClick('settings', <Settings/>)}>Settings</li>
        </ul>
      {/* create a div for the content displayed */}
      <div>{mainContent}</div>
      {/* <div>{isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.length > 0 ? (
            <div>
             
              {data.map((item, index) => {
             return <ProfilePostCard key={index} item={item} onDeletePost={handleDeletePost}/>
           })}
            </div>
          ) : (
            <div>No content saved yet.</div>
          )}
        </div>
      )}</div> */}
    </>
  )
}

export default Profile