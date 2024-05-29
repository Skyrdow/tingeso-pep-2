import React from "react";
import { Car } from "../types";
import dayjs from "dayjs";
import BonusModal from "./BonusModal";

interface CarProps {
  data: Car;
}

const CarElement: React.FC<CarProps> = ({ data }) => {
  return (
    <tr>
      <th>{data.patent}</th>
      <td>{data.brand}</td>
      <td>{data.model}</td>
      <td>{dayjs(data.fabDate).toString()}</td>
      <td>{data.mileage}</td>
      <td>{data.seatCount}</td>
      <td>{data.motorType}</td>
      <td>{data.carType}</td>
      <td>
        <BonusModal
          patent={data.patent}
          brandBonus={data.brandBonus}
        ></BonusModal>
      </td>
    </tr>
  );
};

export default CarElement;
