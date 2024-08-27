import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { showToast } from "../../Assets/toasts";
import { mycontext } from "../../App";

export default function Login() {
  const {baseURL}=useContext(mycontext)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigator = useNavigate();
  const { setIsLoggedIn = () => {} } = useAuthContext();

  const goToSignup = ()=>{
    navigator('/signup')
  }

  function handleSignIn(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length > 0 && password.length > 0) {
      fetch(`${baseURL}/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.success && result.token) {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("userId", result.userId);
            setIsLoggedIn(true);
            navigator("/dashboard/products");
          } else {
            showToast(result.message, "error");
          }
          console.log(result);
        })
        .catch((error) => {
          showToast(error, "error");
        });
    } else {
      showToast("Email or Password is required", "warning");
    }
  }

  return (
    <div
      className="container-fluid"
      style={{
        height: "100vh",
        backgroundImage:'url("https://www.shutterstock.com/image-photo/hand-mechanic-holding-car-service-600nw-2340377479.jpg")',
        backgroundSize:"cover",
        width: "100vw"
      }}
    >
      <div
        className="container-fluid"
        style={{
          height: "100%",
        }}
      >
        <div
          className="row"
          style={{
            height: "100%",
          }}
        >
          <div
            className="col-6"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition:"center",
            }}
          ></div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: "400px" }}>
              <div className="card-body">
                <div className="mb-3">
                  <h3 className="text-center m-4">Sign In <i class="fa-solid fa-lock"></i></h3>
                  <label htmlFor="email" className="form-label">
                    Email address <i class="fa-solid fa-envelope"></i>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <i class="fa-solid fa-key"></i>
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="*********"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: "100%" }}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <br/>
                <br/>
                <a
                  className="btn btn-default"
                  type="button"
                  style={{ width: "100%" }}
                  onClick={goToSignup}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}