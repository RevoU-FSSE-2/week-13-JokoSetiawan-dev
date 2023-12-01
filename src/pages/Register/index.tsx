import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import { UseLocalStorageSet } from "../../hook";

interface RegisterValue {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email("Email Invalid").required("Email Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is Required"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const handleRegister = async (values: RegisterValue) => {

    const apiUrl = 'https://mock-api.arikmpt.com/api/user/register'

    try {
      const response = await fetch (apiUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(values)
      }) 
      
      const data = await response.json()

      if(response.ok){
        const setLocalStorage = UseLocalStorageSet()
        setLocalStorage('registerData', data)
        navigate("/login")
      }else{
        alert(data.errors)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-lg-4 col-12 px-5">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Name
                </label>
                <Field
                  name="name"
                  type="name"
                  className="form-control"
                  id="exampleInpuName"
                />
                <ErrorMessage name="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <ErrorMessage name="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <ErrorMessage name="password" />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
                <button className="btn active">
                <Link
                  className="nav-link"
                  to="/login"
                  role="button"
                  aria-pressed="true"
                >
                  Or Login Here
                </Link>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
