import React from 'react'
import list from'../list'
import Card from './Card'

const Shop = ({handleClick}) => {
  return (
   <section>
    {list.map((item)=> {
       return <Card item={item} key={item.id} handleClick={handleClick}/>
    })}
    <button onClick={() => handleClick()} className='cart_button'>
          See the Cart
        </button> 
        
   </section>
  )
}

export default Shop
