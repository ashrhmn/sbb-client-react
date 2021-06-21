import React, { useState } from "react";
import { useQuery } from "react-query";
import * as ItemsApi from "../../api/ItemsApi";
import AddForm from "./AddForm";
import Tr from "./Tr";


const Items = () => {
  const [adding, setAdding] = useState(false);
  const { data } = useQuery("items",ItemsApi.getItems);
  return (
    <div className="">
      <table className="mx-auto text-4xl border-2">
        <thead>
          <tr className="border-t-4 border-b-4 border-black">
            <th>
              <button
                className={`bg-${
                  adding ? "red" : "green"
                }-500 rounded-md px-2 text-white`}
                onClick={() => setAdding(!adding)}
              >
                {adding ? "Close" : "Add"}
              </button>{" "}
              ID
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adding ? <AddForm /> : <></>}
          {data?.map((item) => (
            <Tr item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;