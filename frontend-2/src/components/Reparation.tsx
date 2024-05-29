import React from "react";
import { Reparation as ReparationT } from "../types";
import dayjs from "dayjs";

interface ReparationProps {
  data: ReparationT;
}
const Reparation: React.FC<ReparationProps> = ({ data }) => {
  return (
    <tr>
      <th>{data.patent}</th>
      <td>{dayjs(data.admissionDate).toString()}</td>
      <td>{dayjs(data.repairExitDate).toString()}</td>
      <td>{dayjs(data.retrievalDate).toString()}</td>
      <td>{data.reparationTypes.toString()}</td>
    </tr>
  );
};

export default Reparation;
