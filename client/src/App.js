import React, {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const [data, setData] = useState([]);

  const handleAddPost = (newData) => {
     console.log(data)
    // Once successful, update the local state with the new post
    setData([...data, newData])

  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
  
    // Filter out the post with the given postId
    const updatedData = data.filter((post) => post._id !== postId);
    setData(updatedData);
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };
  //fetch data from /posts route
  async function getData() {
    try {
      const response = await fetch(`http://localhost:3000/posts`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      
      setData(data.posts)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route 
          path="/posts"
          element={
            <ProtectedRoute>
            <Posts data={data} getData={getData} onDeletePost={handleDeletePost}/>
            <AddPost onAddPost={handleAddPost} />
          </ProtectedRoute>
          } 
          />
      </Routes>
    </div>
  );
}

export default App;
