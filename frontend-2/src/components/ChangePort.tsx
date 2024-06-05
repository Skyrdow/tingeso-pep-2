import { useState } from "react";
import httpCommons from "../http-commons";

export default function ChangePort() {
  const [port, setPort] = useState(localStorage.getItem("port") ?? "8080");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setPort(value);
  };

  return (
    <div className="form-field card card-body bg-white">
      <label htmlFor="" className="form-label">
        Cambiar puerto backend:
      </label>
      <input
        type="text"
        className="input"
        value={port}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          httpCommons.changePort(port);
          localStorage.setItem("port", port)
        }}
      >
        Cambiar
      </button>
    </div>
  );
}
