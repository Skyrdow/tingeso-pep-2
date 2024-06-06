import React, { useState } from "react";
import httpCommons from "../http-commons";
import { Reparation, ReparationType } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCar = () => {
  // region js
  const isFilled = () => {
    if (
      !reparationData.patent ||
      !reparationData.admissionDate ||
      !reparationData.repairExitDate ||
      !reparationData.retrievalDate ||
      reparationData.reparationTypes.length === 0
    )
      return true;
  };

  const [reparationData, setReparationData] = useState<Reparation>({
    patent: "",
    admissionDate: new Date(),
    reparationTypes: [],
    repairExitDate: new Date(),
    retrievalDate: new Date(),
    total: 0,
    sum: 0,
    discount: 0,
    surcharge: 0,
    iva: 0,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setReparationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    httpCommons
      .postReparation(reparationData)
      .then((response) => {
        console.log(response.data);
        setReparationData({
          patent: "",
          admissionDate: new Date(),
          reparationTypes: [],
          repairExitDate: new Date(),
          retrievalDate: new Date(),
          total: 0,
          sum: 0,
          discount: 0,
          surcharge: 0,
          iva: 0,
        });
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const handleAdmissionDate = (newDate: any) => {
    setReparationData((prevReparationData) => ({
      ...prevReparationData,
      ["admissionDate"]: newDate,
    }));
  };
  const handleRepairExitDate = (newDate: any) => {
    setReparationData((prevReparationData) => ({
      ...prevReparationData,
      ["repairExitDate"]: newDate,
    }));
  };
  const handleRetrievalDate = (newDate: any) => {
    setReparationData((prevReparationData) => ({
      ...prevReparationData,
      ["retrievalDate"]: newDate,
    }));
  };

  const handleReparationTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.attributes.getNamedItem("name")?.value;
    const checked = event.target.checked;

    if (checked) {
      setReparationData((prevReparationData) => ({
        ...prevReparationData,
        reparationTypes: [
          ...prevReparationData.reparationTypes,
          value?.toString() as string,
        ],
      }));
    } else {
      setReparationData((prevReparationData) => ({
        ...prevReparationData,
        reparationTypes: prevReparationData.reparationTypes.filter(
          (type) => type !== value,
        ),
      }));
    }
  };

  // #region HTML
  return (
    <form
      onSubmit={handleSubmit}
      className="form-group card bg-white p-4 max-w-80 h-full"
    >
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
          Patente:
        </label>
        <input
          className="input input-ghost-success"
          type="text"
          id="patent"
          name="patent"
          value={reparationData.patent}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="date">
          Fecha de admisión:
        </label>
        <DatePicker
          className="input input-ghost-success"
          id="admissionDate"
          selected={reparationData.admissionDate}
          onChange={handleAdmissionDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          required
        ></DatePicker>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="dateTime">
          Fecha de salida del taller:
        </label>
        <DatePicker
          className="input input-ghost-success"
          id="repairExitDate"
          selected={reparationData.repairExitDate}
          onChange={handleRepairExitDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          required
        ></DatePicker>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="dateTime">
          Fecha de retiro:
        </label>
        <DatePicker
          className="input input-ghost-success"
          id="retrievalDate"
          selected={reparationData.retrievalDate}
          onChange={handleRetrievalDate}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          required
        ></DatePicker>
      </div>
      {Object.values(ReparationType)
        .filter((value) => typeof value == "string")
        .map((type, index) => (
          <div className="form-field" key={index}>
            <label className="flex gap-2 cursor-pointer">
              <input
                id={"id-" + type}
                name={type.toString()}
                type="checkbox"
                className="checkbox"
                onChange={handleReparationTypeChange}
              />
              <span>{type}</span>
            </label>
          </div>
        ))}

      <button
        className={"btn " + (isFilled() ? "btn-error" : "btn-primary")}
        type="submit"
        disabled={isFilled()}
      >
        Añadir auto
      </button>
    </form>
  );
};

export default AddCar;
