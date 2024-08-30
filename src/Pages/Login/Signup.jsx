import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { showToast } from "../../Assets/toasts";
import { mycontext } from "../../App";

export default function SignUp() {
  const { baseURL } = useContext(mycontext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();

  const goToSignIn = () => {
    navigate('/');
  };

  function handleSignup(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    // Basic validation
    if (!email || !password) {
      showToast("Email or Password is required", "warning");
      return;
    }
    
    // Basic email format validation
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //   showToast("Invalid email format", "warning");
    //   return;
    // }

    fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          sessionStorage.setItem("userId", result.userId);
          showToast("Register Success", "success");
          navigate("/login");
        } else {
          showToast(result.message, "error");
        }
        console.log(result);
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        showToast("An error occurred during signup", "error");
      });
    
    }

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="container-fluid" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-6"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: 'url("https://png.pngtree.com/png-clipart/20210307/ourmid/pngtree-car-repair-service-vignette-png-image_3014260.jpg")',
            }}
          ></div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: "400px" }}>
              <div className="card-body">
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
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
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="*"
                  />
                </div>
                
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: "100%" }}
                  onClick={handleSignup}
                >
                  Sign up
                </button>
                <br />
                <br />
                <button
                  className="btn btn-default"
                  style={{ width: "100%" }}
                  onClick={goToSignIn}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}