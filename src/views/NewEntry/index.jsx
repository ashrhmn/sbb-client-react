import { useQueryClient } from "react-query";
import { useState } from "react";

const NewEntry = () => {
  const itemData = useQueryClient().getQueryData(["items"]);
  const [date, setDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerDue, setCustomerDue] = useState("");
  const [amounts, setAmounts] = useState([]);
  return (
    <div>
      <h1>New Entry</h1>
      <div>
        <div className="grid grid-cols-2 w-full bg-red-300">
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>Date</label>
            <div>
              <label> : </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>Phone</label>
            <div>
              <label> : </label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>ID</label>
            <div>
              <label> : </label>
              <input
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>Name</label>
            <div>
              <label> : </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>Address</label>
            <div>
              <label> : </label>
              <input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 text-2xl p-4">
            <label>Due</label>
            <div>
              <label> : </label>
              <input
                value={customerDue}
                onChange={(e) => setCustomerDue(e.target.value)}
                className="border-2 border-black w-80"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="text-3xl">
          <table>
            <thead>
              <tr>
                <th>Count</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {itemData?.map((item, index) => (
                <TableRow
                  item={item}
                  amounts={amounts}
                  setAmounts={setAmounts}
                  index={index}
                  key={item.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;

const TableRow = ({ item, amounts, index, setAmounts }) => {
  const [editing, setEditing] = useState(true);
  return (
    <>
      <tr key={item.id}>
        <td>
          <button
            className="bg-yellow-300 rounded-full p-1"
            onClick={() => setEditing(!editing)}
          >
            ⤵️
          </button>{" "}
          {amounts[index]?.length || 0}
        </td>
        <td>{item.name}</td>
        <td>
          <label>{amounts[index] || 0}</label>
        </td>
        <td>{item.price}</td>
        <td>{item.name}</td>
      </tr>
      {editing ? (
        <tr>
          <td colSpan={5}>
            <EditForm
              preIndex={index}
              amounts={amounts}
              setAmounts={setAmounts}
            />
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
};

const EditForm = ({ preIndex, amounts, setAmounts }) => {
  return (
    <div className="bg-yellow-300">
      <table className="mx-auto text-center">
        <thead>
          <tr>
            <th>-</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input className="w-32" type="text" />
            </td>
            <td>
              <button
                onClick={() => {
                  var temp = [...amounts];
                  if (!temp[preIndex]) {
                    temp[preIndex] = [];
                  }
                  temp[preIndex].push(9);
                  console.log(temp[preIndex]);
                  setAmounts(temp);
                  console.log(amounts);
                }}
              >
                ➕
              </button>
            </td>
          </tr>
          {amounts[preIndex] ? (
            amounts[preIndex].map((amount, index) => (
              <tr key={`.${index + 1}`}>
                {/* <td>{`${preIndex + 1}.${index + 1}`}</td> */}
                <td>{amount}</td>
                <td>
                  <button>❌</button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};
