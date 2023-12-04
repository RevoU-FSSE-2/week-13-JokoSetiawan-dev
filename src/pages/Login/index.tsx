import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthToken } from "../../hook";

interface LoginValue {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email Invalid").required("Email Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is Required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [, saveToken] = useAuthToken();

  const handleLogin = async (values: LoginValue) => {
    const apiUrl = "https://mock-api.arikmpt.com/api/user/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.data.token;
        saveToken(token);
        navigate("/");
      } else {
        alert(data.errors);
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
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            <Form>
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
                  Login
                </button>
                <button className="btn active">
                  <Link
                    className="nav-link"
                    to="/register"
                    role="button"
                    aria-pressed="true"
                  >
                    Or Register Here
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

export default LoginPage;
