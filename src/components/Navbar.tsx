/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image, Form, FormControl, Button, Alert } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, Search } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; role: string };
  const role = userWithRole?.role;
  const pathName = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setErrorMessage(''); // Clear error message when user starts typing
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setErrorMessage('Invalid search.');
      return;
    }
    router.push(`/resultsPage?query=${searchQuery}`);
  };

  return (
    <Navbar style={{ backgroundColor: '#59ce5a' }} expand="lg">
      <Container>
        <Nav className="me-auto justify-content-start">
          <Nav.Link id="about-page-nav" href="/about" active={pathName === '/about'}>
            About
          </Nav.Link>
          {currentUser
            ? [
                <Nav.Link id="add-club-nav" href="/add" key="add" active={pathName === '/add'}>
                  Add Club
                </Nav.Link>,
                <Nav.Link id="list-club-nav" href="/list" key="list" active={pathName === '/list'}>
                  Club List
                </Nav.Link>,
                // <Nav.Link id="list-friend-nav" href="/friends" key="friends" active={pathName === '/friends'}>
                //   Friend List
                // </Nav.Link>,
              ]
            : ''}
          {currentUser && role === 'ADMIN' ? (
            <Nav.Link id="admin-club-nav" href="/admin" key="admin" active={pathName === '/admin'}>
              Admin
            </Nav.Link>
          ) : (
            ''
          )}
        </Nav>
        <Navbar.Brand href="/" className="w-100 d-flex justify-content-center">
          <Image
            src="/daClubLogo.png"
            className="logo fs-2"
            width={190}
            height={65}
            alt="Da Club Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={toggleSearch} style={{ cursor: 'pointer' }}>
              <Search size={20} />
            </Nav.Link>
            {showSearch && (
              <div className="search-dropdown">
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button type="submit" variant="outline-success">Search</Button>
                </Form>
                {errorMessage && <Alert variant="danger" className="mt-2">{errorMessage}</Alert>}
              </div>
            )}
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
