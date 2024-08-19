import { useEffect, useState } from "react"
import { showToast } from "../../Assets/toasts";
import { useAuthContext } from "../../Context/AuthContext";

export default function ManageBrands() {
    const [products, setProducts] = useState([])
    const { currentUser } = useAuthContext();

    useEffect(() => {
        if (currentUser) {
            fetch(`http://localhost:9000/api/brands/getAllBrands`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: sessionStorage.getItem("token"),
                }
            })
            .then((response) => response.json())
            .then((result) => {
                showToast(result.message)
                setProducts(result.response)
            })
            .catch((error) => {
                showToast(error.message, "error")
            })
        }
    }, [currentUser]);

  return (
    <div className="container">
    <table className="table">
    <thead>
        <tr>
        <th scope="col">S.NO</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Branch</th>
        <th scope="col">Address</th>
        <th scope="col">Is Available</th>
        </tr>
    </thead>
    <tbody>
        {brands && brands.length > 0 ? brands.map((brand) => (
                    <tr> 
                        <td>{brand.name}</td>
                        <td>{brand.email}</td>
                        <td>{brand.phoneNumber}</td> 
                        <td>{brand.branch}</td> 
                        <td>{brand.address.addressLine1}</td>
                        <td>{brand.isAvailable ? "Available" : "Not Available"}</td>
                    </tr>
                )): (
                    <tr><td>No Brands Found</td></tr>
                )}
             </tbody>
        </table>
    </div>
  );
}
