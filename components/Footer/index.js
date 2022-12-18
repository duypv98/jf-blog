import { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="mainFooter">
      <Container className="px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="col-md-10 col-lg-8 col-xl-7">
            <div className="footerContent">
              <a className="footerItem" href="https://www.facebook.com/duy.real.1998" target="_blank" rel="noreferrer">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                </span>
              </a>

              <a className="footerItem" href="https://github.com/duypv98" target="_blank" rel="noreferrer">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fab fa-github fa-stack-1x fa-inverse" />
                </span>
              </a>

              <a className="footerItem" href="https://www.linkedin.com/in/ijduypv/" target="_blank" rel="noreferrer">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fab fa-linkedin-in fa-stack-1x fa-inverse" />
                </span>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="gx-4 gx-lg-5 justify-content-center">
          <div className="small text-center text-muted fst-italic">
            Copyright &copy; DuyPV 2021
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default memo(Footer);
