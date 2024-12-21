import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-sm font-medium text-blue-600 border border-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            onClick={logoutHandler}
            aria-label="Logout"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
