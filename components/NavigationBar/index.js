import { memo } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import Link from 'next/link';
import useTrans from '../../hooks/useTrans';

const NavigationBar = () => {
  const trans = useTrans();
  return (
    <Navbar expand="lg" className={styles.mainNav}>
      <Container className="px-4 px-lg-5">
        {/* Logo */}
        <Link href="/" as="/">
          <div className={styles.navLogo}>
            <img src="/images/logo.png" alt="logo" />
          </div>
        </Link>

        {/* Collapse Button */}
        <Navbar.Toggle >
          <i className="fas fa-bars" />
        </Navbar.Toggle>

        <Navbar.Collapse>
          <Nav className="ms-auto py-4 py-lg-0">
            <Nav.Link href="/" className={styles.navItem}>{trans.nav.home}</Nav.Link>
            <NavDropdown title={trans.nav.series} className={styles.navItem} id="series-nav-dropdown" renderMenuOnMount={false}>
              <NavDropdown.Item href="/fe">Front-End | React</NavDropdown.Item>
              <NavDropdown.Item href="/be">Back-End</NavDropdown.Item>
              <NavDropdown.Item href="/devops">DevOps</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default memo(NavigationBar);
