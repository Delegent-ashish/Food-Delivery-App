
import React from 'react';

import {useCart,useDispatchCart} from '../components/ContextReducer';
//import trash from "../trash.svg"
export default function Cart(){
    let data=useCart();
    let dispatch=useDispatchCart();
    if (data.length === 0) {
        return (
          <div>
            <div style={{ color: 'red' }} className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
          </div>
        )
      }
      const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderData", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
        console.log("JSON RESPONSE:::::", response)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }

      }
   
      

     let totalPrice=data.reduce((total,food)=>total+food.price,0) 
return (
    <div>  <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr style={{color: "#fff"}}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td >{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img src="data:image/png;base64,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" alt="delete" width="30" height="30" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
              ))}
          </tbody>
          </table>
          <div> <h1  style={{ color: 'red' }} className='fs-2'>Total Price: {totalPrice}/-</h1></div>
          
          <div>
             <button className='btn- bg-success mt-5 ' onClick={handleCheckOut}> Check out</button>
          </div>
        </div>
    </div>
 )
 }