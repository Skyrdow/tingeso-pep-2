import React from "react";
import { Reparation as ReparationT } from "../types";
import dayjs from "dayjs";

interface ReparationProps {
  data: ReparationT;
}
const Reparation: React.FC<ReparationProps> = ({ data }) => {
  return (
    <tr className="even:bg-amber-50 odd:bg-green-50">
      <th>{data.patent}</th>
      <td>{dayjs(data.admissionDate).toString()}</td>
      <td>{dayjs(data.repairExitDate).toString()}</td>
      <td>{dayjs(data.retrievalDate).toString()}</td>
      <td>{data.reparationTypes.toString()}</td>
      <td>{data.total}</td>
      <td>{data.sum}</td>
      <td>{data.discount}</td>
      <td>{data.surcharge}</td>
      <td>{data.iva}</td>
    </tr>
  );
};

export default Reparation;
