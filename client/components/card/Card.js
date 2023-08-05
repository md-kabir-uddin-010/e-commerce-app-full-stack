import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slice/cartSlice'

export default function Card(props) {

  const cartItem = useSelector(state=>state.cart.cartItem)
  console.log(cartItem)
  const dispatch = useDispatch()

  const handleCart =(item)=>{
    dispatch(addToCart(item))
  }

  return (
    <div className=" w-72 max-w-sm my-2 mx-1 p-4 dark:bg-slate-800 rounded-md shadow-md">
    <div className=" relative">
      <p className={`${!props.free_shiping && 'hidden'}  p-1 text-white bg-black absolute top-0 right-0`}>free shipping</p>
      <img src={props.image.original} alt={props.image.alt}/>
    </div>
    <div className=" py-4">
     <p className=' text-center'>{props.title && props.title}</p>
     <p className=' text-center'>{props.description && props.description.slice(0,20)}...</p>
     <p className=" text-center"> <span className=' font-semibold text-lg'>price</span> {props.price.sale && props.price.sale} {props.currency_format && props.currency_format}</p>
     <p className=" text-center"><span className=' font-semibold text-lg'>reguler price</span> {props.price.regular_price && props.price.regular_price} {props.currency_format && props.currency_format}</p>
    </div>
    <div className=" text-center">
  <button 
  onClick={()=> handleCart(props)}
   type="button"
   className=" w-full py-2 bg-black text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500">Add To Card</button>
    </div>
  </div>
  )
}
