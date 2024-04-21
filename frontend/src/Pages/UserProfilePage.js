import Navbar from '../features/Navbar/NavBar';
import UserProfile from '../features/user/compnent/UserProfile';

function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}

export default UserProfilePage;