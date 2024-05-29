import React from "react";

interface Report2TableProps {
  reparationType: string;
  carTypes: Array<string | number>[];
}

const Report2Table: React.FC<Report2TableProps> = ({
  reparationType,
  carTypes,
}) => {
  // Implement your component logic here

  return (
    <div className="flex flex-col items-center gap-2 bg-white p-5 rounded-xl shadow-xl">
      <h1 className="bg-success text-white text-2xl p-2 rounded-xl">
        {reparationType}
      </h1>
      <div className="flex w-fit">
        <table className="table-zebra table bg-success/10 rounded-xl">
          <thead>
            <tr>
              <th>Tipo de auto</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {carTypes
              .sort((a: any, b: any) => b.totalPrice - a.totalPrice)
              .map((item: any) => (
                <tr>
                  <th>{item.carType}</th>
                  <td>{item.count}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report2Table;
