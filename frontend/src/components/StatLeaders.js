import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useFilters, useSortBy } from 'react-table';

const StatLeaders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatLeaders = async () => {
      try {
        const response = await axios.get('/api/stat-leaders/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStatLeaders();
  }, []);

  // Filter UI
  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); 
        }}
        placeholder={`Search...`}
        style={{ width: '100%' }}
      />
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Player Name',
        accessor: 'player_name',
        Filter: DefaultColumnFilter, 
      },
      {
        Header: 'Team',
        accessor: 'team',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Stat Category',
        accessor: 'stat_category',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Stat Value',
        accessor: 'stat_value',
        disableFilters: true, // Disable filter on this column
      },
      {
        Header: 'Season',
        accessor: 'season',
        Filter: DefaultColumnFilter,
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, 
    },
    useFilters, 
    useSortBy
  );

  return (
    <div>
      <h2>MLB Stat Leaders</h2>
      <table {...getTableProps()} style={{ border: 'solid 1px black', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div> {/* Render the filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatLeaders;
