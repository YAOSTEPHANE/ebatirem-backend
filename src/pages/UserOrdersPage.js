import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";


function UserOrdersPage() {
    return (
        <div>
            <NavBar>
                <h1 className='mx-auto text-2xl'>Mes Commandes</h1>
                <UserOrders></UserOrders> 
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;