import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import { Route, Routes, Navigate} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Pay from "./pages/pay.jsx";
import Success from "./pages/success.jsx";
import {useSelector} from "react-redux";
import Wishlist from "./pages/Wishlist.jsx";
import Cancel from "./pages/cancel.jsx";
import Navbar from "./components/Navbar.jsx";
import Announcements from "./components/Announcements.jsx";
function App() {
    const user = useSelector(state=>state.user.currentUser)
  return (
    <div>
        {user && <Navbar/>}
        {user && <Announcements />}

        <Routes>
            <Route path={"/"} element={user?<Home /> : <Navigate to={"/login"} />} />
            <Route path={"/login"} element={!user ? <Login /> : <Navigate to={"/"} />} />
            <Route path={"/register"} element={!user ? <Register /> : <Navigate to={"/"} />} />
            <Route path={"/products/:category"} element={user ? <ProductList /> : <Navigate to={"/login"} />} />
            <Route path={"/product/:id"} element={user ? <Product /> : <Navigate to={"/login"} />} />
            <Route path={"/products/"} element={user ? <ProductList /> : <Navigate to={"/login"} />} />
            <Route path={"/cart"} element={user ? <Cart /> : <Navigate to={"/login"} />} />
            <Route path={"/pay"} element={user ? <Pay /> : <Navigate to={"/login"} />} />
            <Route path={"/success"} element={user ? <Success /> : <Navigate to={"/login"} />} />
            <Route path={"/cancel"} element={user ? <Cancel /> : <Navigate to={"/login"} />} />
            <Route path={"/wishlist"} element={user ? <Wishlist /> : <Navigate to={"/login"} />} />
        </Routes>
    </div>
  )
}

export default App
