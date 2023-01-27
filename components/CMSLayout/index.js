import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import useCMSAuth from "../../hooks/useCMSAuth";
import AuthCMS from "./AuthCMS";
import "./cms-layout.scss";

/**
 *
 * @param {import("react").PropsWithChildren<{}>} props
 * @returns
 */
const CMSLayout = (props) => {
  const { auth } = useCMSAuth();
  const router = useRouter();

  const goToLink = (e, link) => {
    e.preventDefault();
    router.push(link);
  }

  return <>
    <Head>
      <meta charSet="utf-8" />
      <title>CMS | Duy PV - Jerry F</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Navbar bg="dark" expand={false} className="mb-3 cms-navbar">
      <Container fluid>
        <Navbar.Brand className="cms-navbar-brand" onClick={(e) => goToLink(e, "/cms")}>CMS</Navbar.Brand>
        {!auth?.loading && !!auth?.user && <Navbar.Toggle aria-controls="cms-nav" className="cms-navbar-toggle" />}
        <Navbar.Offcanvas
          id="cms-nav"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>CMS</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/cms/categories" onClick={(e) => goToLink(e, "/cms/categories")}>Categories</Nav.Link>
              <Nav.Link href="/cms" onClick={(e) => goToLink(e, "/cms")}>Posts</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    <AuthCMS>
      {props.children}
    </AuthCMS>
  </>
}

export default CMSLayout;