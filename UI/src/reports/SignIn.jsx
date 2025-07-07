// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/apis/User";
import { useForm } from "react-hook-form";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slicer/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log("Login successful:", response);
      dispatch(loginSuccess({accessToken: response.data.accessToken, user: response.data.user}));
      toast.success("Login successful");
      navigate('/dashboard')
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/alsafeer_logo.png" alt="" 
                    style={{ width: 250}}
                    />
                    {/* <span className="d-none d-lg-block"></span> */}
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your Username & Password to login
                      </p>
                    </div>

                    <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Username
                        </label>
                        <div className="input-group has-validation">
                        <input
                        {...register('username', { required: 'Username is required' })}
                        type="text"
                        className="form-control mb-3"
                        placeholder="Username"
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            {...register('password', { required: 'Password is required' })}
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Password"
                            style={{ paddingRight: '40px' }} 
                          />
                          {errors.password && <p>{errors.password.message}</p>}

                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              cursor: 'pointer',
                              color: '#6c757d'
                            }}
                          >
                            {showPassword ? (
                              <i className="fas fa-eye-slash"></i> 
                            ) : (
                              <i className="fas fa-eye"></i> 
                            )}
                          </span>
                        </div>
                      </div>

                      {/* <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            value="true"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                      {/* <div className="col-12">
                        <p className="small mb-0">
                          Don&apos;t have account?{" "}
                          <Link to="/register-user">Create an account</Link>
                        </p>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignIn;
