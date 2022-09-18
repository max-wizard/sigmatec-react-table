import React, { useState } from 'react'
import { useTable , useFilters } from "react-table";
import ModalImage from 'react-modal-image';

export default function TableMobile({ columns, data }) {

    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        // found Error "This is likely caused by the value changing from a defined to undefined, which should not happen"
        if(value == null){
            setFilter("title", ""); // Default value
            setFilterInput("");
        }else{
            setFilter("title", value); // Update the title filter. Now our table will filter and show only the rows which have a matching value
            setFilterInput(value);
        }
        
    };

  // Use the useTable Hook to send the columns and data to build the table
  const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        getCellProps,
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter,
    } = useTable({
        columns,
        data,
    },
    useFilters,
  );

  return (
    <div>
        <input value={filterInput} onChange={handleFilterChange} placeholder={"type your search keywords here..."} />
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tbody>
                        <tr key={i} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                        <tr {...row.getRowProps()}>
                            <td colSpan='2'>
                            <ModalImage small={row.original.thumbnailUrl} large={row.original.thumbnailUrl} alt="Modal"/></td>
                        </tr>
                    </tbody>
                );
                })}
            </tbody>
        </table>
    </div>
    
  );
}