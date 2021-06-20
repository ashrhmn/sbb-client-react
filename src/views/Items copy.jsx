import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiURL, token } from "../Consts";

const Items = () => {
  const [items, setItems] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const getItems = () => {
    axios
      .get(`${apiURL}items`, {
        headers: { "auth-token": token() },
      })
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setItems(null);
        setLoaded(false);
      });
  };
  useEffect(() => {
    getItems();
  }, []);
  const ItemTableRows = () => {
    const ItemItems = items.map((item, index) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setItems(() => {
                let item = items;
                item[index].name = e.target.value;
                return item;
              });
            }}
            value={item.name}
          />
          {/* {item.name} */}
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setItems(() => {
                let item = items;
                item[index].price = e.target.value;
                return item;
              });
            }}
            value={item.price}
          />
          {/* {item.price} */}
        </td>
      </tr>
    ));
    // return {ItemItems};
    return <tbody>{ItemItems}</tbody>;
  };
  return (
    <div>
      <div>Items</div>
      {loaded ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>ItemId</th>
                <th>Name</th>
                <th>Price/Yard</th>
              </tr>
            </thead>
            <ItemTableRows />
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Items;
