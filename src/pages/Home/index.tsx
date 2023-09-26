import React, { useState, useEffect} from "react";
import styles from "./home.module.css";

interface IDataItem {
  id: string;
  name: string;
  isActive: string;
}

interface DataTableProps {
  data: IDataItem[];
}


const HomePage: React.FC<DataTableProps> = () => {
    const [data, setData] = useState<IDataItem[]>([]);

    const fetchData = async () => {
        const apiUrl = 'https://mock-api.arikmpt.com/api/category?page=1&name=mock category'
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            const data = await response.json()
            setData(data.data)
            console.log(data.current_page);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    

  return (
    
    <div className={`container pt-4 ${styles.homeContainer}`}>

      <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            <th scope="row">1</th>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.isActive}</td>
            <td>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default HomePage;
