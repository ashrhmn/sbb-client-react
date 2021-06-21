import React, { useState } from "react";
import { useQueryClient } from "react-query";
import AddForm from "./AddForm";
import TableRow from "./TableRow";

const Items = () => {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const data = queryClient.getQueryData(["items"]);
  return (
    <div className="">
      <table className="mx-auto text-2xl border-2">
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
            <TableRow item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
