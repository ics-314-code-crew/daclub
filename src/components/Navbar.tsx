'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, Pencil, PersonCircle, Trash } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; role: string };
  const role = userWithRole?.role;
  const pathName = usePathname();

  return (
    <Navbar
      expand="lg"
      className="bg-dark text-white shadow navbar-dark"
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image
            src="/daClubLogo.png"
            alt="Da Club Logo"
            width={120}
            height={40}
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" className="text-white" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link
              href="/about"
              className={`text-white ${pathName === '/about' ? 'fw-bold' : ''}`}
            >
              About
            </Nav.Link>
            {currentUser && (
              <>
                <Nav.Link
                  href="/add"
                  className={`text-white ${
                    pathName === '/add' ? 'fw-bold' : ''
                  }`}
                >
                  Add Club
                </Nav.Link>
                <Nav.Link
                  href="/list"
                  className={`text-white ${
                    pathName === '/list' ? 'fw-bold' : ''
                  }`}
                >
                  Club List
                </Nav.Link>
                <Nav.Link
                  href="/my-clubs"
                  className={`text-white ${
                    pathName === '/my-clubs' ? 'fw-bold' : ''
                  }`}
                >
                  My Clubs
                </Nav.Link>
                {role === 'SUPER_ADMIN' && (
                  <Nav.Link
                    href="/admin"
                    className={`text-white ${
                      pathName === '/admin' ? 'fw-bold' : ''
                    }`}
                  >
                    Manage Clubs
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center">
            {session ? (
              <NavDropdown
                title={(
                  <span className="text-white">
                    {`${role === 'SUPER_ADMIN' ? '(Da Club Admin) ' : ''}${currentUser}`}
                  </span>
                )}
                id="user-dropdown"
                align="end"
                className="text-white"
              >
                {/* Profile Section */}
                <NavDropdown.Item href="/auth/profile">
                  <PersonCircle className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/edit-profile">
                  <Pencil className="me-2" />
                  Edit Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />

                {/* Sign Out */}
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>

                <NavDropdown.Divider />

                {/* Security Settings */}
                <NavDropdown.Item href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/delete-account" className="mt-2">
                  <Trash className="me-2 red-text" />
                  <span className="red-text">Delete Account</span>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={<span className="text-white">Login</span>}
                id="guest-dropdown"
                align="end"
                className="text-white"
              >
                <NavDropdown.Item href="/auth/signin">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">Sign Up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
