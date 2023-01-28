import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef } from 'react';
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import useTrans from '../../hooks/useTrans';
import './NavigationBar.scss';

const NavigationBar = () => {
  const trans = useTrans();
  const router = useRouter();

  /**
   * @type {import("react").MutableRefObject<HTMLElement>}
   */
  const navRef = useRef();

  useEffect(() => {
    function navScroll(_) {
      if (window.scrollY > 66.8) {
        if (navRef.current) {
          navRef.current.classList.add("nav-sticky");
        }
      } else if (navRef.current) {
        navRef.current.classList.remove("nav-sticky");
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", navScroll)
    }
  }, []);

  /**
   *
   * @param {'vi' | 'en'} locale
   */
  const changeLang = (locale) => {
    const currentPath = router.asPath;
    router.push(`${currentPath}`, undefined, { shallow: true, locale });
  }

  return (
    <Navbar expand="lg" className="mainNav" ref={navRef}>
      <Container className="px-4 px-lg-5 position-relative">
        {/* Logo */}
        <Link href="/" as="/">
          <div className="logoMenu">
            <div className="navLogo">
              <img src="/images/logo.png" alt="logo" />
            </div>

            <Dropdown>
              <Dropdown.Toggle variant="none" id="lang-collapse" className="langCollapse">
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
            <Link passHref href="/" locale={router.locale}><Nav.Link className="navItem">{trans.nav.home}</Nav.Link></Link>
            <NavDropdown title={trans.nav.series} className="navItem" id="series-nav-dropdown" renderMenuOnMount={false}>
              <Link passHref href="/fe" locale={router.locale}><NavDropdown.Item>Front-End | React</NavDropdown.Item></Link>
              <Link passHref href="/be" locale={router.locale}><NavDropdown.Item>Back-End</NavDropdown.Item></Link>
              <Link passHref href="/devops" locale={router.locale}><NavDropdown.Item>DevOps</NavDropdown.Item></Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default memo(NavigationBar);
