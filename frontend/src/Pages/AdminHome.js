import AdminProductList from "../features/admin/AdminProductList";
import NavBar from "../features/Navbar/NavBar";

function AdminHome() {
    return ( 
        <div>
          <NavBar>
            <AdminProductList />
          </NavBar>
        </div>
     );
}

export default AdminHome;