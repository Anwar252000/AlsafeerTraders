// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../services/apis/User";
import { logout, selectUserId } from "../../store/slicer/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [ChangePassword] = useResetPasswordMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const confirmPasswordRef = useRef(); 
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    
    if (formData.newPassword !== confirmPasswordRef.current.value) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setConfirmPasswordError("");
    
    try {
      const payload = {
          userId: userId,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
      };
    
      await ChangePassword({body: payload}).unwrap();
      dispatch(logout());
      navigate("/sign-in");
      toast.success("Password has been changed successfully");
    } catch (error) {
      toast.error("Reset Password failed");
    }
  };

   const togglePasswordVisibility = (fieldId) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Reset Password
                      </h5>
                    </div>

                    <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12">
                        <div className="input-group has-validation">
                        <input
                        {...register('oldPassword', { required: 'Password is required' })}
                        type="password"
                        className="form-control mb-3"
                        placeholder="Current Password"
                        />
                        {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                        </div>
                      </div>

                      <div className="col-12">
                        <div style={{ position: 'relative' }}>
                          <input
                            {...register('newPassword', { required: 'Password is required' })}
                            type={showPassword.newPassword ? 'password' : 'password'}
                            className="form-control"
                            placeholder="New Password"
                            style={{ paddingRight: '40px' }} 
                          />
                          {errors.newPassword && <p>{errors.newPassword.message}</p>}

                          <span
                            onClick={() => togglePasswordVisibility('newPassword')}
                              style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              cursor: 'pointer',
                              color: '#6c757d',
                              id:'1'
                            }}
                          >
                            {showPassword.newPassword ? (
                              <i className="fas fa-eye-slash"></i> 
                            ) : (
                              <i className="fas fa-eye"></i> 
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div style={{ position: 'relative' }}>
                          <input
                            ref={confirmPasswordRef}
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Confirm Password"
                            style={{ paddingRight: '40px' }} 
                          />
                          {confirmPasswordError && <p>{confirmPasswordError}</p>}

                          <span
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              cursor: 'pointer',
                              color: '#6c757d',
                               id:'2'
                            }}
                          >
                            {showPassword.confirmPassword ? (
                              <i className="fas fa-eye-slash"></i> 
                            ) : (
                              <i className="fas fa-eye"></i> 
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Save
                        </button>
                      </div>
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

export default ChangePassword;
