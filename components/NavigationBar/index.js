import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import useTrans from '../../hooks/useTrans';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const trans = useTrans();
  const router = useRouter();

  /**
   *
   * @param {'vi' | 'en'} locale
   */
  const changeLang = (locale) => {
    const currentPath = router.asPath;
    router.push(`${currentPath}`, undefined, { shallow: true, locale });
  }

  return (
    <Navbar expand="lg" className={styles.mainNav}>
      <Container className="px-4 px-lg-5 position-relative">
        {/* Logo */}
        <Link href="/" as="/">
          <div className={styles.logoMenu}>
            <div className={styles.navLogo}>
              <img src="/images/logo.png" alt="logo" />
            </div>

            <Dropdown>
              <Dropdown.Toggle variant="none" id="lang-collapse" className={styles.langCollapse}>
                <i className="fas fa-globe" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLang('vi')}>Tiếng Việt</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLang('en')}>Tiếng Anh</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Link>

        {/* Collapse Button */}
        <Navbar.Toggle>
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
