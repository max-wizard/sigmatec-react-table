import React, { useMemo , useEffect , useState } from 'react'
import { useTable , useFilters , usePagination } from "react-table";

export default function Table({ columns, data }) {

    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        // setFilterInput(e.target.value);
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
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex, pageSize },
        gotoPage,
        pageCount,
        setPageSize
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 2 }
    },
    useFilters,
    usePagination
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
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
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
        </table>
        <div>
        {/* <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
        />
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show: {pageSize}
            </option>
          ))}
        </select>
        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          {'<<'}
        </button>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          Next
        </button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous
        </button>
        <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          {'>>'}
        </button> */}
      </div>
    </div>
    
  );
}