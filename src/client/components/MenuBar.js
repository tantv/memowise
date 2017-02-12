import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const MenuBar = ({ user, mobile, signOut }) => {
  const name = user ? user.name : '';

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut().then(() => browserHistory.push('/'));
  };

  if (mobile) {
    return (
      <ul id="nav-mobile" className="side-nav">
        <li>
          {
            name ?
              <Link to="/profile" id="user">{name}</Link> :
              <Link to="/sign-in" id="menu-signin">Sign In</Link>
          }
        </li>
        <li>
          {
            name ?
              <Link to="" id="menu-signout" onClick={handleSignOut}>Sign Out</Link> :
              <Link to="/sign-up" id="menu-signup">Create Account</Link>
          }
        </li>
      </ul>
    );
  }

  return (
    <ul className="right hide-on-med-and-down">
      <li>
        {
          name ?
            <Link to="/profile" id="user">{name}</Link> :
            <Link to="/sign-in" id="menu-signin">Sign In</Link>
        }
      </li>
      <li>
        {
          name ?
            <Link to="" id="menu-signout" onClick={handleSignOut}>Sign Out</Link> :
            <Link to="/sign-up" id="menu-signup">Create Account</Link>
        }
      </li>
    </ul>
  );
};

MenuBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  mobile: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
  mobile: false,
};

export default MenuBar;