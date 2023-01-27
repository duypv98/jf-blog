import { Container, Spinner } from "react-bootstrap";
import useCMSAuth from "../../hooks/useCMSAuth"
import LoginForm from "../LoginForm";

/**
 *
 * @param {import("react").PropsWithChildren<{}>} param0
 */
const AuthCMS = ({ children }) => {
  const { auth } = useCMSAuth();

  return auth?.loading
    ? <Spinner />
    : auth?.user
      ? <>{children}</>
      : <Container>
        <LoginForm />
      </Container>;
}

export default AuthCMS;