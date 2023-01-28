import { memo } from 'react';
import './Header.scss';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from "classnames";

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
    <header className="masthread" style={{ backgroundImage: `url(${backgroundSrc})` }}>
      <Container className="position-relative px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="col-md-12 col-lg-12 col-xl-10">
            <div className={classNames(isSiteHeader ? "siteTitle" : "postTitle")}>
              <h1>{title}</h1>
              {isSiteHeader ? (
                <span className="siteSubTitle">{subTitle}</span>
              ) : (
                <>
                  <h2 className="postSubTitle">{subTitle}</h2>
                  <span className={meta}>{meta}</span>
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
