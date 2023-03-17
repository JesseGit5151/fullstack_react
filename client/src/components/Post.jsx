import React from 'react'

const Post = ({ item, getData }) => {
  const handleClick = async () => {
    const response = await fetch(`http://localhost:3000/posts/${item._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
    console.log(response)
    const json = await response.json()
    if(response.ok) {
      console.log(json)
      getData()
    }else {
      console.log('error')
    }
  }


  return (
    <div>
      <h3>
      {item.title}
      </h3>
      <p>{item.description}</p>
      <img src={`http://localhost:3000/${item.image}`} style={{width:'100px', height:'100px'}} />
      <button onClick={handleClick}>trash</button>
    </div>
  )
}

export default Post