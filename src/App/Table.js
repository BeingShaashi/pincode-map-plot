import React from "react";

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Postal Code</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <TableRow key={item.postalCode || i} item={item} index={i} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ item, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.postalCode}</td>
      <td>{item.latitude}</td>
      <td>{item.longitude}</td>
    </tr>
  );
}

export default Table;
