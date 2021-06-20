import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as ItemsApi from "../api/ItemsApi";

const Items = () => {
  const { data } = useQuery("items", ItemsApi.getItems);
  return (
    <div className="">
      <table className="mx-auto text-4xl border-2">
        <thead>
          <tr className="border-t-4 border-b-4 border-black">
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <Tr item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;

const Td = ({ data }) => {
  return <td className="py-3 px-20">{data}</td>;
};

const Tr = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate: updateData } = useMutation(
    (item) => ItemsApi.updateItem(item),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
        setEditing(false);
        setId("");
        setName("");
        setPrice("");
      },
    }
  );

  const { mutate: deleteData } = useMutation(
    (item) => ItemsApi.deleteItem(item.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
        setEditing(false);
        setId("");
        setName("");
        setPrice("");
      },
    }
  );

  const [editing, setEditing] = useState(false);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const handleEdit = () => {
    if (editing) {
      updateData({
        id: id,
        name: name,
        price: price,
      });
    } else {
      setEditing(true);
      setId(item.id);
      setName(item.name);
      setPrice(item.price);
    }
  };

  const handleDelete = () => {
    deleteData({
      id: id,
      name: name,
      price: price,
    });
  };
  return (
    <>
      <tr className="border-b-2 border-black">
        <Td data={item.id} />
        <Td data={item.name} />
        <Td data={item.price} />
        <td className="px-12">
          <button
            className={`bg-${
              editing ? "green" : "blue"
            }-500 text-white rounded-md p-1`}
            onClick={handleEdit}
          >
            {editing ? "Save" : "Edit"}
          </button>
        </td>
      </tr>
      {editing ? (
        <EditForm
          setId={setId}
          setName={setName}
          setPrice={setPrice}
          id={id}
          name={name}
          price={price}
          handleDelete={handleDelete}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const EditForm = ({
  id,
  name,
  price,
  setId,
  setName,
  setPrice,
  handleDelete,
}) => {
  return (
    <tr className="bg-green-500">
      <td className="p-3 px-8">
        <input
          className="w-20"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </td>
      <td className="p-3 px-8">
        <input
          className="w-52"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="p-3 px-8">
        <input
          className="w-40 text-right"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </td>
      <td className="px-12">
        <button
          className={`bg-red-500 text-white rounded-md p-1`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
