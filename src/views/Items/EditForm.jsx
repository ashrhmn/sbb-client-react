
const EditForm = ({
    bgColor,
    id,
    name,
    price,
    setId,
    setName,
    setPrice,
    btnText,
    btnColor,
    btnAction,
  }) => {
    return (
      <tr className={`bg-${bgColor}-500`}>
        <td className="p-3 px-8">
          <input
            className="w-20"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </td>
        <td className="p-3 px-8">
          <input
            className="w-52"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td className="p-3 px-8">
          <input
            className="w-40 text-right"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </td>
        <td className="px-12">
          <button
            className={`bg-${btnColor}-500 text-white rounded-md p-1`}
            onClick={btnAction}
          >
            {btnText}
          </button>
        </td>
      </tr>
    );
  };
  

  export default EditForm;