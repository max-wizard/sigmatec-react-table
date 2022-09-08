import React, { useMemo } from 'react';
import { useTable, useColumnOrder } from 'react-table';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';

const ColumnOrderTable = props => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder
  } = useTable(
    {
      columns,
      data
    },
    useColumnOrder
  );

  const changeColumnOrder = () => {
    setColumnOrder([
      'id',
      'last_name',
      'first_name',
      'phone',
      'date_of_birth',
      'country'
    ]);
  };

  return (
    <div className="table-container">
      <h2>Column Order Table</h2>
      <button onClick={changeColumnOrder}>Change column order</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')} </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ColumnOrderTable;
