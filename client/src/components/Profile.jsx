import React from 'react'
import Navbar from "./Navbar"
const Profile = () => {
  return (
    <div>
      <Navbar/>
      {/* create a div for the tags: profile - saved - settings */}<div>Tags</div>
      {/* create a div for the content displayed */}
      <div>main content</div>
    </div>
  )
}

export default Profile