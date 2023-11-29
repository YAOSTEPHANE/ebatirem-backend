import NavBar from "../features/navbar/Navbar";
import UserProfile from './../features/user/components/UserProfile';


function UserProfilePage() {
    return (
        <div>
            <NavBar>
                <h1 className='mx-auto text-2xl'>Mon Profile</h1>
                <UserProfile></UserProfile> 
            </NavBar>
        </div>
    );
}

export default UserProfilePage;