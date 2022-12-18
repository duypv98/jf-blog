import Head from "next/head"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

/**
 *
 * @param {import("react").PropsWithChildren<{}>} props
 * @returns
 */
const CMSLayout = (props) => {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <title>CMS | Duy PV - Jerry F</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Navbar bg="dark" expand={false} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/cms">CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="cms-nav" />
        <Navbar.Offcanvas
          id="cms-nav"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>CMS</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/cms/categories">Categories</Nav.Link>
              <Nav.Link href="/cms/">Posts</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    {props.children}
  </>
}

export default CMSLayout;