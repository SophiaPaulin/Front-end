import { useEffect, useState } from "react";

export default function ManageProducts() {
 const [products, setProducts] =  useState([])

  useEffect(() => {
    fetch("http://localhost:9000/api/products/getAllProducts", {headers: {
      'Content-Type': 'application/json',
      authorization: sessionStorage.getItem("token")
    }}).then((result) => result.json()).then((response) => {
      console.log("products", response)
      if (response.status) {
        setProducts(response.result)
      }
    }).catch((error)=>{
      console.log({error})
    })
  }, [])
  console.log({products})

  return (
    <>
      <div>Products List</div>
      <div className="card p-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Normal Price</th>
              <th scope="col">Actual Price</th>
              <th scope="col">Avail Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? products.map((product) => (
              <tr>
                <td>{product.name}</td>
                <td>{product.normalPrice}</td>
                <td>{product.actualPrice}</td>
                <td>{product.availableQuantity}</td>
                
              </tr>
            )) : (
              <tr><td>No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
