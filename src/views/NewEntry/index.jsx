import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { update } from "../../api/GenericApi";

import SummationRow from './SummationRow'
import TableRow from './TableRow'

const NewEntry = () => {
  const itemData = useQueryClient().getQueryData(["items"]);
  const [date, setDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerDue, setCustomerDue] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [customRate, setCustomRate] = useState([]);

  const { mutate: updateInvoices } = useMutation(
    (invoice) => update("invoices", invoice),
    {
      onSuccess: (data) => {
        console.log("updated invoice");
        console.log(data);
        setInvoiceId(data.id);
        saveInvoiceItems(data.id);
      },
    }
  );

  const { mutate: updateInvoiceItems } = useMutation(
    (invoiceItem) => update("invoiceItems", invoiceItem),
    {
      onSuccess: (data) => {
        console.log("updated Invoiceitems");
        console.log(data);
      },
    }
  );

  const saveInvoiceItems = (newInvoiceId) => {
    for (let i = 0; i < amounts.length; ++i) {
      if (amounts[i]) {
        for (let j = 0; j < amounts[i].length; ++j) {
          const rate =
            customRate[i] && customRate[i].enabled
              ? customRate[i].rate
              : itemData[i].price;

          const data = {
            invoiceId: newInvoiceId,
            itemId: itemData[i].id,
            amount: amounts[i][j],
            rate,
          };
          updateInvoiceItems(data);
        }
      }
    }
  };

  const handleSave = () => {
    let invoice = {
      customerId,
      date,
    };
    if (invoiceId) {
      invoice.id = invoiceId;
    }
    updateInvoices(invoice);
  };

  return (
    <div className="mb-40">
      <h1>New Entry</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto sm:w-3/4 md:w-full bg-green-400 text-lg md:text-2xl">
          <div className="flex justify justify-between bg-green-400 p-4">
            <label>Date</label>
            <div>
              <label> : </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-2 border-black w-64 text-center"
                type="date"
              />
            </div>
          </div>
          <div className="flex justify-around md:justify-between">
            <div className="flex justify justify-between bg-green-400 p-4">
              <label>Invoice ID</label>
              <div>
                <label> : </label>
                <input
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  className="border-2 border-black w-16"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify justify-between bg-green-400 p-4">
              <label>Customer ID</label>
              <div>
                <label> : </label>
                <input
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="border-2 border-black w-16"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 p-4">
            <label>Phone</label>
            <div>
              <label> : </label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="border-2 border-black w-64"
                type="text"
              />
            </div>
          </div>

          <div className="flex justify justify-between bg-green-400 p-4">
            <label>Name</label>
            <div>
              <label> : </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border-2 border-black w-64"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 p-4">
            <label>Address</label>
            <div>
              <label> : </label>
              <input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border-2 border-black w-64"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify justify-between bg-green-400 p-4">
            <label>Due</label>
            <div>
              <label> : </label>
              <input
                value={customerDue}
                onChange={(e) => setCustomerDue(e.target.value)}
                className="border-2 border-black w-64"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="text-lg">
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
                  itemData={itemData}
                  item={item}
                  amounts={amounts}
                  setAmounts={setAmounts}
                  customRate={customRate}
                  setCustomRate={setCustomRate}
                  index={index}
                  key={item.id}
                />
              ))}
              <SummationRow
                customRate={customRate}
                amounts={amounts}
                itemData={itemData}
              />
              <tr>
                <td>
                  <button onClick={handleSave}>Save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;


