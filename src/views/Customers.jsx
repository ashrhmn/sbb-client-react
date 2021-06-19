import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customers.css";

const Customers = () => {
  const [loaded, setLoaded] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [showAction, setShowAction] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    prevDue: 0,
  });
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get("http://localhost:8080/customers", {
        headers: {
          "auth-token": localStorage.getItem("JWToken") || "",
        },
      })
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setTableData(null);
        setLoaded(false);
      });
  };
  const updateNewField = (value, objName) => {
    let customer = newCustomer;
    if (objName === "name") {
      customer.name = value;
    } else if (objName === "address") {
      customer.address = value;
    } else if (objName === "phone") {
      customer.phone = value;
    } else if (objName === "prevDue") {
      customer.prevDue = value;
    }
    console.log("local customer" + customer.name);
    setNewCustomer(customer);
    console.log(newCustomer);
  };

  const updateField = (index, value, objName) => {
    let newArr = [...tableData];
    if (objName === "name") {
      newArr[index].name = value;
    } else if (objName === "address") {
      newArr[index].address = value;
    } else if (objName === "phone") {
      newArr[index].phone = value;
    } else if (objName === "prevDue") {
      newArr[index].prevDue = value;
    }
    setTableData(newArr);
    // console.log(tableData);
  };

  const handleAddCustomer = () => {
    axios
      .post("http://localhost:8080/customers", newCustomer, {
        headers: {
          "auth-token": localStorage.getItem("JWToken") || "",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getCustomers();
      });
  };

  const handleDeleteCustomer = (index) => {
    axios
      .delete("http://localhost:8080/customers/" + tableData[index].id, {
        headers: {
          "auth-token": localStorage.getItem("JWToken") || "",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getCustomers();
      });
  };

  const handleUpdateCustomer = (index) => {
    axios
      .post("http://localhost:8080/customers", tableData[index], {
        headers: {
          "auth-token": localStorage.getItem("JWToken") || "",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getCustomers();
      });
  };

  const TableRow = () => {
    const data = tableData.map((dataRow, index) => (
      <tr className="cusTableBody" key={dataRow.id}>
        <td>{dataRow.id}</td>
        <td>
          <div>
            {/* <label htmlFor="name">Name : </label> */}
            <input
              name="name"
              type="text"
              onChange={(e) => updateField(index, e.target.value, "name")}
              value={dataRow.name}
              readOnly={!showAction}
            />
          </div>
          <div>
            {/* <label htmlFor="address">Address : </label> */}
            <textarea
              name="address"
              onChange={(e) => updateField(index, e.target.value, "address")}
              type="text"
              value={dataRow.address}
              readOnly={!showAction}
            ></textarea>
          </div>
          <div>
            {/* <label htmlFor="phone">Phone : </label> */}
            <input
              name="phone"
              onChange={(e) => updateField(index, e.target.value, "phone")}
              type="text"
              value={dataRow.phone}
              readOnly={!showAction}
            />
          </div>
        </td>
        <td>
          <div>
            <label>PrevDue : </label>
            <input
              className="w-20 text-right"
              name="prevDue"
              onChange={(e) => updateField(index, e.target.value, "prevDue")}
              type="text"
              value={dataRow.prevDue}
              readOnly={!showAction}
            />
          </div>
          <div>
            <label>Sold : </label>
            <p className="text-right">10000</p>
          </div>
          <div>
            <label>Paid : </label>
            <p className="text-right">10000</p>
          </div>
          <div>
            <label>TotalDue : </label>
            <p className="text-right">10000</p>
          </div>
        </td>
        {showAction ? (
          <td>
            <div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleUpdateCustomer(index)}
                  className="bg-green-600 text-white px-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteCustomer(index)}
                  className="bg-red-600 text-white px-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        ) : (
          <></>
        )}
        {!showAction ? (
          <td>
            <div>
              <div className="flex flex-col space-y-2">
                <button className="bg-green-600 text-white px-1 rounded">
                  View
                </button>
                <button className="bg-blue-600 text-white px-1 rounded">
                  New
                </button>
              </div>
            </div>
          </td>
        ) : (
          <></>
        )}
      </tr>
    ));
    return <tbody>{data}</tbody>;
  };
  return (
    <div>
      {loaded ? (
        <div>
          <div className="flex flex-col items-end p-2">
            <div>
              <input
                type="checkbox"
                checked={showAction}
                onChange={() => setShowAction(!showAction)}
                name="showActionToggle"
              />
              &nbsp;
              <label htmlFor="showActionToggle">Edit</label>
            </div>
          </div>
          <table className="text-lg mx-auto border-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Details</th>
                <th>Summary</th>
                {showAction ? <th>Actions</th> : <></>}
                {!showAction ? <th>Data</th> : <></>}
              </tr>
            </thead>
            {TableRow()}
            <tbody>
              {showAction ? (
                <tr>
                  <td></td>
                  <td>
                    <div>
                      {/* <label htmlFor="name">Name : </label> */}
                      <input
                        name="name"
                        type="text"
                        // onChange={(e) => updateNewField(e.target.value, "name")}
                        onChange={(e) =>
                          setNewCustomer(() => {
                            let customer = newCustomer;
                            customer.name = e.target.value;
                            return customer;
                          })
                        }
                        placeholder="Name"
                        // value={newCustomer.name}
                      />
                    </div>
                    <div>
                      {/* <label htmlFor="address">Address : </label> */}
                      <input
                        name="address"
                        onChange={(e) =>
                          updateNewField(e.target.value, "address")
                        }
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                    <div>
                      {/* <label htmlFor="phone">Phone : </label> */}
                      <input
                        name="phone"
                        onChange={(e) =>
                          updateNewField(e.target.value, "phone")
                        }
                        type="text"
                        placeholder="Phone"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <label htmlFor="prevDue">PrevDue : </label>
                      <input
                        className="w-20 text-right"
                        name="prevDue"
                        onChange={(e) =>
                          updateNewField(e.target.value, "prevDue")
                        }
                        type="text"
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      className="bg-yellow-600 text-white p-1 rounded"
                      onClick={handleAddCustomer}
                    >
                      Add New
                    </button>
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Customers;
