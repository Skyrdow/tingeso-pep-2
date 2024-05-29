import React, { useState } from "react";
import httpCommons from "../http-commons";

interface BonusModalProps {
  patent: string;
  brandBonus: number;
}

const BonusModal: React.FC<BonusModalProps> = ({ patent, brandBonus }) => {
  const [newBrandBonus, setBrandBonus] = useState<number>(brandBonus);
  const handleSubmit = () => {
    httpCommons
      .setBrandBonus(patent, newBrandBonus)
      .then((response) => {
        console.log(patent);
        console.log(response);
        setBrandBonus(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <label
        className="btn btn-primary btn-block"
        htmlFor={"modal-1-" + patent}
      >
        {brandBonus}
      </label>
      <input className="modal-state" id={"modal-1-" + patent} type="checkbox" />

      <div className="modal">
        <label className="modal-overlay" htmlFor={"modal-1-" + patent}></label>

        <div className="modal-content flex flex-col gap-5">
          <label
            htmlFor={"modal-1-" + patent}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 -m-1"
          >
            ✕
          </label>
          <h2 className="text-xl">Cambiar el bono de marca</h2>
          <p>El bono de marca actual es de: {brandBonus}</p>
          <input
            min={0}
            type="number"
            value={newBrandBonus}
            onChange={(e) => setBrandBonus(parseInt(e.target.value))}
            className="input input-ghost-success"
          ></input>
          <label
            htmlFor={"modal-1-" + patent}
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Cambiar
          </label>
        </div>
      </div>
    </>
  );
};

export default BonusModal;
