import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useAuthToken } from "../../hook";

interface CategoryValue {
  id: string;
  name: string;
  is_active: boolean;
}

const CategorySchema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required("Input Category Name"),
  is_active: Yup.boolean().required("Select Status"),
});

const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [, , , getToken] = useAuthToken();

  const [initialValues, setInitialValues] = useState<CategoryValue>({
    id: "",
    name: "",
    is_active: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://mock-api.arikmpt.com/api/category/${id}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        console.log(data.id);
        

        if (response.ok && data) {
          setInitialValues({
            id: data.id,
            name: data.name,
            is_active: data.isActive,
          });
        } else {
          console.log("Failed to fetch category details.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, getToken]);

  const handleEditCategory = async (values: CategoryValue) => {
    try {
      console.log(values.id);
      
      const requestBody = {
        id: values.id,
        name: values.name,
        is_active: values.is_active,
      };

      const apiUrl = `https://mock-api.arikmpt.com/api/category/update`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
    <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "50vh" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={CategorySchema}
        onSubmit={handleEditCategory}
      >
        <Form>
          {/* Hidden input for id */}
          <Field type="hidden" name="id" value={initialValues.id} />

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <Field
              name="name"
              type="text"
              className="form-control"
              id="exampleInputName"
            />
            <ErrorMessage name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputStatus" className="form-label">
              Status
            </label>
            <Field
              as="select"
              name="is_active"
              className="form-select"
              id="exampleInputStatus"
            >
              <option value="">Select Status</option>
              <option value="true">Active</option>
              <option value="false">Deactive</option>
            </Field>
            <ErrorMessage name="is_active" />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCategory;
