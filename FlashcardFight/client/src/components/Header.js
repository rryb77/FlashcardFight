import React, {useContext, useState} from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

const Header = () => {
  
  const { isLoggedIn, logout, isAdmin } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Study Hero</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/create">Create</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/flashcards">Browse Sets</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/mysets">My Sets</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/subscriptions/${currentUser.id}`}>Subscriptions</NavLink>
                </NavItem>

                
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
                
            {isAdmin &&
                <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories">Category Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/users">User Management</NavLink>
                </NavItem>
                </>
            }
            {isLoggedIn &&
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;