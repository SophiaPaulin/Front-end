import { useContext, useEffect, useState } from "react";
import { mycontext } from "../../App";

export default function ManageOrders() {
  const {baseURL}= useContext(mycontext)
 const [orders, setOrders] =  useState([])

  useEffect(() => {
    fetch(`${baseURL}/api/orders/getAllOrders`, {headers: {
      'Content-Type': 'application/json',
      authorization: sessionStorage.getItem("token")
    }}).then((result) => result.json()).then((response) => {
      console.log("orders", response)
      if (response.status) {
        setOrders(response.result)
      }
    }).catch((error)=>{
      console.log({error})
    })
  }, [])
  console.log({orders})

  return (
    <>
      <div>Orders List</div>
      <div className="card p-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Orders</th>
              <th scope="col">Order Value</th>
              <th scope="col">Order Status</th>
              <th scope="col">Paid Status</th>
              <th scope="col">Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? orders.map((order) => (
              <tr>
                <td>{JSON.stringify(order.products)}</td>
                <td>{order.orderValue}</td>
                <td>{order.orderStatus}</td>
                <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                <td>{order.paymentMode}</td>
                
              </tr>
            )) : (
              <tr><td>No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
