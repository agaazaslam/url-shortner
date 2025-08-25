import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router";
const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_AUTH_URL;
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      if (confirmPassword === password) {
        const data = {
          username,
          email,
          password,
        };

        const response = await axios.post(`${baseUrl}signup`, data);
        console.log(response.data);
        toast.success("Successfully Signed Up");
        //navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while signing up");
    }
  };

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card bg-base-100 w-full max-w-lg p-6 shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignUp}>
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  onChange={(event) => handleChange(event, setUsername)}
                  value={username}
                  type="text"
                  className="input"
                  placeholder="username"
                />

                <label className="label">Email</label>
                <input
                  onChange={(event) => handleChange(event, setEmail)}
                  value={email}
                  type="email"
                  className="input"
                  placeholder="Email"
                />

                <label className="label">Password</label>
                <input
                  onChange={(event) => handleChange(event, setPassword)}
                  value={password}
                  type="password"
                  className="input"
                  placeholder="Password"
                />

                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  onChange={(event) => handleChange(event, setConfirmPassword)}
                  value={confirmPassword}
                  className="input"
                  placeholder="Confirm Password"
                />
                <div>
                  <Link to="/auth/login" className="link link-hover">
                    Already a user ? Login
                  </Link>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  SignUp
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
