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
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {itemData?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
