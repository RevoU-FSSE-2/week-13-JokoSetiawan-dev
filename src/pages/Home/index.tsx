import React, { useState, useEffect, useRef } from "react";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { AddDataButton } from "../../components";
import { useAuthToken } from "../../hook";

interface IDataItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface DataTableProps {
  data: IDataItem[];
}

const HomePage: React.FC<DataTableProps> = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IDataItem[]>([]);
  const [, , , getToken] = useAuthToken();
  const dataFetched = useRef(false);

  const fetchData = async () => {
    try {
      const apiUrl = "https://mock-api.arikmpt.com/api/category";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const responseData = await response.json();

      if (response.ok) {
        setData(responseData.data);
        console.log(responseData.data);
      } else {
        console.log("Failed to fetch data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch data only if a token is available and it hasn't been fetched already
    if (getToken() && !dataFetched.current) {
      fetchData();
      dataFetched.current = true;
    } else if (!getToken()) {
      navigate("/login");
    }
  }, [getToken, navigate]);

  const handleDeleteCategory = async (id: string) => {
    try {
      const apiUrl = `https://mock-api.arikmpt.com/api/category/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        // Refresh the data after deleting if needed.
        fetchData();
      } else {
        console.log("Failed to delete category.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`container pt-4 ${styles.homeContainer}`}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem) => (
            <tr key={dataItem.id}>
              <td>{dataItem.id}</td>
              <td>{dataItem.name}</td>
              <td>{dataItem.isActive ? "Active" : "Deactive"}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/category/update`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteCategory(dataItem.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddDataButton
          onClick={() => {
            // Handle click logic
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
