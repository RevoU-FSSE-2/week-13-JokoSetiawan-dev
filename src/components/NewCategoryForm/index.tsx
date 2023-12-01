import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UseLocalStorageGet } from "../../hook";

interface CategoryValue {
  name: string;
}

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Input Category Name"),
});

const NewCategory: React.FC = () => {
  const navigate = useNavigate();

  const handleAddCategory = async (values: CategoryValue) => {
    const apiUrl = "https://mock-api.arikmpt.com/api/category/create";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UseLocalStorageGet("authToken", "")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "50vh"}}
    >
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={CategorySchema}
        onSubmit={handleAddCategory}
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
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewCategory
