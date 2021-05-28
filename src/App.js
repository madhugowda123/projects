import React from "react";
import "./App.css";
import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br />
      <button onClick={handleShow}>submit</button>

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">phoneno</th>
            <th scope="col">gender</th>
          </tr>
        </thead>
        {show && (
          <tbody>
            {items.map((d) => (
              <tr key={d.name}>
                <th>{d.name}</th>
                <td>{d.email}</td>
                <td>{d.phoneno}</td>
                <td>{d.gender}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default App;
