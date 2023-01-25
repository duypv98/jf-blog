import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiLogin } from "../../app/apis/auth.api";
import CMSAuthContext from "../../context/CMSAuthContext";
import "./login-form.scss";

const LoginForm = () => {
  const { setAuth } = useContext(CMSAuthContext);
  const { register, handleSubmit } = useForm();

  const handleLogin = (dataLogin) => {
    apiLogin(dataLogin)
      .then((loginData) => {
        if (!loginData) {
          toast("Login Failed", { type: "error" });
          return;
        }
        const { name, accessToken, refreshToken } = loginData;
        localStorage.setItem("x-access-token", accessToken);
        localStorage.setItem("x-refresh-token", refreshToken);
        toast(`Welcome! ${name}`, { type: "info" });
        setAuth({
          user: { name }
        });
      })
      .catch(() => {
        toast("Login Failed", { type: "error" });
      })
  }

  return <form id="login-form" onSubmit={handleSubmit(handleLogin)}>
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="login-account">Account</label>
      <input type="text" id="login-account" className="form-control" {...register("account")} />
    </div>

    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="login-pwd">Password</label>
      <input type="password" id="login-pwd" className="form-control" {...register("password")} />
    </div>

    <div className="d-flex justify-content-center">
      <Button type="submit">Login</Button>
    </div>
  </form>
}

export default LoginForm;