import { useQueryClient } from "react-query";

const NewEntry = () => {
  const itemData = useQueryClient().getQueryData(["items"])
  return (
    <div>
      <h1>New Entry</h1>
      <div>
        {itemData?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
    </div>
  );
};

export default NewEntry;
