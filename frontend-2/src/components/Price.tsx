import React from "react";
import { Price, ReparationType } from "../types";

interface PriceProps {
  data: Price;
}

const PriceElement: React.FC<PriceProps> = ({ data }) => {
  return (
    <tr>
      <th>{ReparationType[data.id]} ({data.id})</th>
      <th>{data.gasolinePrice}</th>
      <th>{data.dieselPrice}</th>
      <th>{data.hibridoPrice}</th>
      <th>{data.electricoPrice}</th>
    </tr>
  );
};

export default PriceElement;
