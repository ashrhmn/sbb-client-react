import { useState, useRef } from "react";

// import EditForm from "../Items/EditForm";

const TableRow = ({
    item,
    amounts,
    index,
    setAmounts,
    customRate,
    setCustomRate,
    itemData,
  }) => {
    const [editing, setEditing] = useState(false);
    return (
      <>
        <tr
          key={item.id}
          className={`${editing ? "bg-yellow-300" : "bg-blue-300"}`}
        >
          <td className="px-2 py-2 border-b-2 border-black">
            <button
              className={`${
                editing ? "bg-blue-300" : "bg-yellow-300"
              } rounded-full p-2`}
              onClick={() => setEditing(!editing)}
            >
              {!editing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            &nbsp;&nbsp;
            <label className="text-right">{amounts[index]?.length || 0}</label>
          </td>
          <td className="px-2 py-2 border-b-2 border-black">{item.name}</td>
          <td className="px-2 py-2 border-b-2 border-black text-right">
            <label>{require("lodash").sum(amounts[index]) || 0}</label>
          </td>
          <td className="px-2 py-2 border-b-2 border-black text-right">
            {customRate[index] && customRate[index]?.enabled
              ? customRate[index]?.rate
              : item.price}
          </td>
          <td className="px-2 py-2 border-b-2 border-black text-right">
            {(customRate[index] && customRate[index]?.enabled
              ? customRate[index]?.rate
              : item.price) * require("lodash").sum(amounts[index]) || 0}
          </td>
        </tr>
        {editing ? (
          <tr>
            <td colSpan={5}>
              <EditForm
                preIndex={index}
                amounts={amounts}
                setAmounts={setAmounts}
                customRate={customRate}
                setCustomRate={setCustomRate}
                itemData={itemData}
              />
            </td>
          </tr>
        ) : (
          <></>
        )}
      </>
    );
  };

const EditForm = ({
    preIndex,
    amounts,
    setAmounts,
    customRate,
    setCustomRate,
    itemData,
  }) => {
    const [amount, setAmount] = useState("");
    const [inputRef, setInputFocus] = useFocus();
    const [multiplier, setMultiplier] = useState(1);
    return (
      <div className="bg-yellow-300 p-2">
        <table className="mx-auto text-center">
          <tbody>
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
                        temp[preIndex].splice(index, 1);
                        setAmounts(temp);
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
            <tr>
              <td colSpan={2}>
                <input
                  ref={inputRef}
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
                    if (!multiplier) {
                      setMultiplier(1);
                    }
                    if (amount) {
                      for (let i = 0; i < multiplier; ++i) {
                        temp[preIndex].push(parseFloat(amount));
                      }
                      setAmounts(temp);
                    }
                    setInputFocus();
                    setAmount("");
                  }}
                >
                  <div className="text-2xl bg-green-400 text-white border-2 border-black rounded-full pl-1 pr-1 pt-0.5 pb-0.5">
                    ➕
                  </div>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="w-20 text-center"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                />
              </td>
              <td colSpan={2}>
                <label>Multiplier</label>
              </td>
            </tr>
            <tr>
              <td className="pt-8" colSpan={2}>
                <input
                  value={customRate[preIndex]?.rate || ""}
                  onChange={(e) => {
                    var temp = [...customRate];
                    if (!temp[preIndex]) {
                      temp[preIndex] = {
                        enabled: e.target.value ? true : false,
                        rate: e.target.value,
                      };
                    } else {
                      temp[preIndex].rate = e.target.value;
                      temp[preIndex].enabled = e.target.value ? true : false;
                    }
                    setCustomRate(temp);
                    console.log(customRate);
                  }}
                  className="w-32 text-right"
                  type="text"
                />
              </td>
              <td>
                <input
                  checked={customRate[preIndex]?.enabled || false}
                  onChange={(e) => {
                    var temp = [...customRate];
                    if (!temp[preIndex]) {
                      temp[preIndex] = {
                        enabled: e.target.checked,
                        rate: itemData[preIndex]?.price,
                      };
                    } else {
                      temp[preIndex].enabled = e.target.checked;
                    }
                    setCustomRate(temp);
                    console.log(customRate);
                  }}
                  className=""
                  type="checkbox"
                />
                &nbsp;
                <label className="text-sm">Custom</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
  
    return [htmlElRef, setFocus];
  };
  export default TableRow;