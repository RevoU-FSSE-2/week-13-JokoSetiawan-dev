import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UseLocalStorageGet } from "../../hook";

interface CategoryValue {
  name: string;
  isActive: string;
}

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Input Category Name"),
});

const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<CategoryValue>({
    name: "",
    isActive: "",
  });

  useEffect(() => {
    const apiUrl = `https://mock-api.arikmpt.com/api/category`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${UseLocalStorageGet("authToken", "")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialValues({ name: data.name, isActive: data.isActive});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditCategory = async (values: CategoryValue) => {
    const apiUrl = `https://mock-api.arikmpt.com/api/category`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Failed to update category.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "50vh" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CategorySchema}
        onSubmit={handleEditCategory}
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
              id="exampleInputName"
            />
            <ErrorMessage name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Status
            </label>
            <Field
              as="select"
              name="isActive"
              className="form-select"
              id="exampleInputStatus"
            >
              <option value="true">Active</option>
              <option value="false">Deactive</option>
            </Field>
            <ErrorMessage name="isActive" />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit" >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCategory;
