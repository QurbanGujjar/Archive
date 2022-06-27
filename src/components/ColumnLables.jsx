import React from 'react'

const ColumnLables = ({length}) => {



  return (
    <div>
{/* {handleLables()} */}
columns -----------
{length.map((item,index )=>{
  return < ><span key={item[index]}>{index+1} {",,,,"}{ " "} </span></>

})}
    </div>
  )
}

export default ColumnLables
