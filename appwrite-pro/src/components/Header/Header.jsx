import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="block md:hidden p-2 rounded-full focus:outline-none hover:bg-gray-200"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>

          {/* Navigation Menu */}
          <ul
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-white shadow-md md:static md:flex md:shadow-none md:bg-transparent md:space-x-4`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="md:inline-block w-full md:w-auto">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-center w-full px-6 py-2 duration-200 hover:bg-blue-100 md:inline-block rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="w-full md:w-auto">
                <LogoutBtn onClick={() => setMobileMenuOpen(false)} />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
