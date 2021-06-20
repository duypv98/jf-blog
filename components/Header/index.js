import { memo } from 'react';
import styles from './Header.module.scss';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * 
 * @param {{
 *  backgroundSrc?: string;
 *  isSiteHeader?: boolean;
 *  title?: string;
 *  subTitle?: string;
 *  meta?: string;
 * }} props 
 * @returns 
 */
const Header = (props) => {
  const {
    backgroundSrc = '/images/home-bg.jpg',
    isSiteHeader = false,
    title = 'Title',
    subTitle = 'SubTitle',
    meta = 'Meta'
  } = props;
  return (
    <header className={styles.masthread} style={{ backgroundImage: `url(${backgroundSrc})` }}>
      <Container className="position-relative px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="col-md-10 col-lg-8 col-xl-7">
            <div className={isSiteHeader ? styles.siteTitle : styles.postTitle}>
              <h1>{title}</h1>
              {isSiteHeader ? (
                <span className={styles.siteSubTitle}>{subTitle}</span>
              ) : (
                <>
                  <h2 className={styles.postSubTitle}>{subTitle}</h2>
                  <span className={styles.meta}>{meta}</span>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default memo(Header);
