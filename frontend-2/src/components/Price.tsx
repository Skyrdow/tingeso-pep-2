import React from "react";
import { Price, ReparationType } from "../types";

interface PriceProps {
  data: Price;
}

const PriceElement: React.FC<PriceProps> = ({ data }) => {
  return (
    <tr>
      <th>{ReparationType[data.id]}</th>
      <th>{data.dieselPrice}</th>
      <th>{data.electricoPrice}</th>
      <th>{data.gasolinaPrice}</th>
      <th>{data.hibridoPrice}</th>
    </tr>
  );
};

export default PriceElement;
