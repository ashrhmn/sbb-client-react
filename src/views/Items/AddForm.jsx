import {useState} from 'react'
import { useQueryClient, useMutation } from "react-query";
import * as ItemsApi from '../../api/ItemsApi'
import EditForm from './EditForm'

const AddForm = () => {
    const queryClient = useQueryClient();
    const { mutate: updateData } = useMutation(
      (item) => ItemsApi.updateItem(item),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["items"]);
        },
      }
    );
  
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
  
    const handleAdd = () => {
      let item = null;
      if (id) {
        item = { id, name, price };
      } else {
        item = { name, price };
      }
      updateData(item);
    };
  
    return (
      <EditForm
        bgColor={"blue"}
        setId={setId}
        setName={setName}
        setPrice={setPrice}
        id={id}
        name={name}
        price={price}
        btnText={"Add"}
        btnColor={"green"}
        btnAction={handleAdd}
      />
    );
  };

  export default AddForm;