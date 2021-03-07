import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { setNavPage } from "../redux/actions";

function Header(props) {

  return (
    <div className="header">
      <div className="header-left">
        PREX
      </div>
      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="active" to="/markets">
          Markets
        </NavLink>
        <NavLink exact activeClassName="active" to="/blogs">
          Blogs
        </NavLink>
        <NavLink exact activeClassName="active" to="/help">
          Help
        </NavLink>
      </nav>
      <div className="header-right">
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { nav_page } = state.Layout;
  return { nav_page };
};

export default connect(mapStateToProps, { setNavPage })(Header);