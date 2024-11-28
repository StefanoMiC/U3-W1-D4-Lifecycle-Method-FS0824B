import { Container, Nav, Navbar } from "react-bootstrap";
// questo componente sta operando un RETURN IMPLICITO (avendo omesso le graffe)
const TopBar = props => (
  <Navbar expand="sm" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="#home">EpicStaurant — {props.claim}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Prenota Tavolo</Nav.Link>
          <Nav.Link href="#link">Prenotazioni</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default TopBar;
