import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { AddDataButton } from "../../components";

interface IDataItem {
  id: string;
  name: string;
  isActive: boolean;
}

interface DataTableProps {
  data: IDataItem[];
}

const HomePage: React.FC<DataTableProps> = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<IDataItem[]>([]);

  const fetchData = async () => {
    const apiUrl = "https://mock-api.arikmpt.com/api/category";
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(!token) navigate('/login')
    fetchData();
  }, []);

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
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.isActive ? "Active" : "Deactive"}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => navigate(`/category/update/${data.id}`)}>Edit</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <AddDataButton onClick={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </div>
  );
};

export default HomePage;
