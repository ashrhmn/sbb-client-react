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
          <table className="mx-auto">
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
  const [editing, setEditing] = useState(false);
  return (
    <>
      <tr
        key={item.id}
        className={`${editing ? "bg-yellow-300" : "bg-blue-300"}`}
      >
        <td className="px-6 py-2 border-b-2 border-black">
          <button
            className={`${
              editing ? "bg-blue-300" : "bg-yellow-300"
            } rounded-full pr-3 pl-3 pt-1 pb-1`}
            onClick={() => setEditing(!editing)}
          >
            {!editing ? "⤵️" : "⤴️"}
          </button>&nbsp;&nbsp;
          <label className="text-right">{amounts[index]?.length || 0}</label>
        </td>
        <td className="px-6 py-2 border-b-2 border-black">{item.name}</td>
        <td className="px-6 py-2 border-b-2 border-black text-right">
          <label>{require("lodash").sum(amounts[index]) || 0}</label>
        </td>
        <td className="px-6 py-2 border-b-2 border-black text-right">{item.price}</td>
        <td className="px-6 py-2 border-b-2 border-black text-right">
          {item.price * require("lodash").sum(amounts[index]) || 0}
        </td>
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
  const [amount, setAmount] = useState(0);
  return (
    <div className="bg-yellow-300 p-2">
      <table className="mx-auto text-center">
        <tbody>
          <tr>
            <td colSpan={2}>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-32 text-right"
                type="text"
              />
            </td>
            <td>
              <button
                onClick={() => {
                  var temp = [...amounts];
                  if (!temp[preIndex]) {
                    temp[preIndex] = [];
                  }
                  if (amount) {
                    temp[preIndex].push(parseFloat(amount));
                    console.log(temp[preIndex]);
                    setAmounts(temp);
                    console.log(amounts);
                  }
                }}
              >
                <div className="text-2xl bg-green-400 text-white border-2 border-black rounded-full pl-1 pr-1 pt-0.5 pb-0.5">
                  ➕
                </div>
              </button>
            </td>
          </tr>
          {amounts[preIndex] ? (
            amounts[preIndex].map((amount, index) => (
              <tr key={`.${index + 1}`}>
                <td>
                  <div className="text-xl border-2 border-black rounded-full">{`${
                    preIndex + 1
                  }.${index + 1}`}</div>
                </td>
                <td>{amount}</td>
                <td>
                  <button
                    onClick={() => {
                      var temp = [...amounts];
                      //   temp[preIndex] = temp[preIndex].splice(index,1)
                      temp[preIndex].splice(index, 1);
                      console.log(temp[preIndex]);
                      setAmounts(temp);
                      console.log(amounts);
                    }}
                  >
                    <div className="text-xl bg-red-300 text-white border-2 border-black rounded-full pl-1 pr-1 pt-0.5 pb-0.5">
                      ❌
                    </div>
                  </button>
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
