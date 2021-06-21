import React from "react";
import { useQuery, useQueryClient } from "react-query";
import * as ItemsApi from "../../api/ItemsApi";

const NewEntry = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["items"])
//   const { data: itemData } = useQuery("items", ItemsApi.getItems);
  return (
    <div>
      <h1>New Entry</h1>
      <div>
        {/* {itemData?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))} */}
      </div>
    </div>
  );
};

export default NewEntry;
