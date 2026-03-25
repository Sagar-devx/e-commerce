import { useState, useContext, useRef, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/icon-dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("userData");
      if (stored) {
        const user = JSON.parse(stored);
        setUserName(user.name);
      } else {
        setUserName(null);
      }
    };

    loadUser();

    // 🔥 Listen to login/logout events
    window.addEventListener("userLogin", loadUser);

    return () => window.removeEventListener("userLogin", loadUser);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserName(null);

    // 🔥 Notify login state update
    window.dispatchEvent(new Event("userLogin"));
  };

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className="navbar">

      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>Shopper</p>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="Dropdown"
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to="/">Shop</Link> {menu === 'shop' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('men')}>
          <Link to="/men">Men</Link> {menu === 'men' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('women')}>
          <Link to="/women">Women</Link> {menu === 'women' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to="/kids">Kids</Link> {menu === 'kids' ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">

        {userName ? (
          <div className="nav-user">
            <span className="nav-username">Hello, {userName}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;