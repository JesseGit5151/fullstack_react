import React from 'react'

const Post = ({ item, onDeletePost }) => {
  const handleClick = async () => {
    onDeletePost(item._id);
  }


  return (
    <div>
      <img src={`http://localhost:3000/${item.image}`} style={{width:'100px', height:'100px'}} />
      <p>
      {item.title}
      </p>
      <p>{item.description}</p>
      <button onClick={handleClick}>trash</button>
    </div>
  )
}

export default Post