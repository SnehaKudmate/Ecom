import Navbar from '../features/Navbar/NavBar';
import UserOrders from '../features/user/compnent/UserOrders';

function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl'>My Order</h1>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}

export default UserProfilePage;