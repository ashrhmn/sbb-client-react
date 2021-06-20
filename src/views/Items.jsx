import React from "react";
import { useQuery } from "react-query";
import * as ItemsApi from "../api/ItemsApi";

const Items = () => {
  const { data } = useQuery("items", ItemsApi.getItems);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
