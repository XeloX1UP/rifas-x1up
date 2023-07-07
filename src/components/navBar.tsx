"use client";
import Link from "next/link";
import { NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { usePathname } from "next/navigation";
// import NavDropdown from "react-bootstrap/NavDropdown";
const links = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Cuenta",
    href: "/user",
  },
  {
    name: "Juegos",
    href: "/games",
  },
  {
    name: "Buscar",
    href: "/search",
  },
];
function NavBar() {
  const pathname = usePathname();
  const pathList = pathname?.split("/");

  return (
    <Navbar expand="md" style={{ background: "#2E3840" }}>
      <Container fluid>
        <Navbar.Brand href="/" as={Link} style={{ color: "#EEEEEE" }}>
          Rifas X1UP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {links.map((link) => {
              if (
                link.href ===
                `/${pathList ? (pathList[1] ? pathList[1] : pathList[0]) : ""}`
              ) {
                return (
                  <NavLink active key={link.href} href={link.href} as={Link}>
                    {link.name}
                  </NavLink>
                );
              }
              return (
                <NavLink
                  active={false}
                  key={link.href}
                  href={link.href}
                  as={Link}
                >
                  {link.name}
                </NavLink>
              );
            })}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
