import React from "react";

interface Report4TableProps {
  reparationType: string;
  motorTypes: Array<string | number>[];
}

const Report4Table: React.FC<Report4TableProps> = ({
  reparationType,
  motorTypes,
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
              <th>Tipo de motor</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {motorTypes
              .sort((a: any, b: any) => b.totalPrice - a.totalPrice)
              .map((item: any) => (
                <tr>
                  <th>{item.motorType}</th>
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

export default Report4Table;
