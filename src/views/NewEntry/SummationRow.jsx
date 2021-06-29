const SummationRow = ({ itemData, amounts, customRate }) => {
    const TotalItemCount = () => {
      let count = 0;
      for (let i = 0; i < amounts.length; ++i) {
        if (amounts[i]) {
          count += parseInt(amounts[i].length);
        }
      }
      return count;
    };
  
    const TotalPrice = () => {
      let price = 0;
      for (let i = 0; i < amounts.length; ++i) {
        if (amounts[i]) {
          price += parseInt(
            require("lodash").sum(amounts[i]) *
              (customRate[i] && customRate[i]?.enabled
                ? customRate[i]?.rate
                : itemData[i].price)
          );
        }
      }
      return price;
    };
  
    return (
      <tr className="bg-indigo-300 text-right">
        <td className="px-6 py-2">
          <TotalItemCount />
        </td>
        <td className="px-6 py-2" colSpan={3}>
          Total
        </td>
        <td className="px-6 py-2">
          <TotalPrice />
        </td>
      </tr>
    );
  };

  export default SummationRow;