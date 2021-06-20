import { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
  /**
   * 
   * @param {string} link 
   * @returns 
   */
  const redirectContact = (link) => {
    return window?.open(link, '_blank');
  }


  return (
    <footer className={`${styles.mainFooter} border-top`}>
      <Container className="px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="col-md-10 col-lg-8 col-xl-7">
            <div className={styles.footerContent}>
              <div className={styles.footerItem} onClick={() => redirectContact('https://www.facebook.com/duy.real.1998')}>
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                </span>
              </div>

              <div className={styles.footerItem} onClick={() => redirectContact('https://github.com/duypv98')}>
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                </span>
              </div>

              <div className={styles.footerItem} onClick={() => redirectContact('https://www.linkedin.com/in/ijduypv/')}>
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
                </span>
              </div>

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
