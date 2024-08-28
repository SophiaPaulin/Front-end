import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Landing from "./Pages/Landing";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Login/Signup";
import Settings from "./Pages/Settings";
import Products from "./Pages/Products";
import Insights from "./Pages/Insights";
import Discounts from "./Pages/Discounts";
import ManageProducts from "./Pages/Products/ManageProducts";
import ManageDiscounts from "./Pages/Discounts/ManageDiscounts";
import {useAuthContext} from "./Context/AuthContext";
import NotFound from "./Pages/NotFound";
import CreateBrand from "./Pages/Brands";
import ManageBrands from "./Pages/Brands/ManageBrands";
import ManageOrders from "./Pages/Orders/manageOrders";
import OrdersCreate from "./Pages/Orders";
import { createContext } from "react";

export const mycontext= createContext(true)

function App() {
    const {isLoggedIn} = useAuthContext();
    // const baseURL= "http://localhost:9000"
     const baseURL="https://backend-1-u5ce.onrender.com";
    return (
        <div>
            <mycontext.Provider value={{baseURL}}>
            <ToastContainer/>
            <Routes>
                {!isLoggedIn && <Route Component={Login} exact path="/"/>}
                <Route Component={Login} path="/login"/>
                <Route Component={SignUp} path="/signup"/>
                {isLoggedIn && (
                    <Route Component={Landing} path="/dashboard">
                        <Route Component={Insights} index/>
                        <Route Component={Products} path="/dashboard/products/create"/>
                        <Route Component={ManageProducts} path="/dashboard/products/"/>
                        <Route Component={Discounts} path="/dashboard/offers/create"/>
                        <Route Component={ManageDiscounts} path="/dashboard/offers/"/>
                        <Route Component={Settings} path="/dashboard/settings"/>
                        <Route Component={CreateBrand} path="/dashboard/brand/create"/>
                        <Route Component={ManageBrands} path="/dashboard/brand/manage"/>
                        <Route Component={ManageOrders} path="/dashboard/orders/manage"/>
                        <Route Component={OrdersCreate} path="/dashboard/orders/create"/>
                    </Route>
                )}
                <Route Component={NotFound} path="*"/>
            </Routes>
            </mycontext.Provider>
        </div>
    );
}

export default App;
