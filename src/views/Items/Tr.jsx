import {useState} from 'react'
import { useQueryClient, useMutation } from "react-query";
import * as ItemsApi from '../../api/ItemsApi'
import Td from './Td'
import EditForm from "./EditForm";

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
        updateData({ id, name, price });
      } else {
        setEditing(true);
        setId(item.id);
        setName(item.name);
        setPrice(item.price);
      }
    };
  
    const handleDelete = () => {
      deleteData({ id, name, price });
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
            bgColor={"green"}
            setId={setId}
            setName={setName}
            setPrice={setPrice}
            id={id}
            name={name}
            price={price}
            btnText={"Delete"}
            btnColor={"red"}
            btnAction={handleDelete}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  export default Tr;