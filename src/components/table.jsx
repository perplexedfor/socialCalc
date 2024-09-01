'use client'

import React, { useState, useEffect, useMemo, useReducer, useRef } from 'react';
import csvDownload from 'json-to-csv-export';
import { updateTextData } from '@/index'
import { useToast } from "@/components/ui/use-toast"
import deepEqual from 'fast-deep-equal';
// import './index.css';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { makeData } from './makeData';
import { FooterCell } from './tables/footercell';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import {supabase} from '@/supabase'

const defaultColumn = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

export default function PageTable(params) {
  const { toast } = useToast()
  const defaultColumns = useMemo(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'firstName',
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: (props) => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );
  
  const [columns] = React.useState(() => [...defaultColumns]);
  const refreshData = () => setData(() => []);
  const [columnResizeMode, setColumnResizeMode] = React.useState('onChange');
  const [columnResizeDirection, setColumnResizeDirection] = React.useState('ltr');
  const rerender = useReducer(() => ({}), {})[1];
  const [data, setData] = useState([]);
  const [initialFetch, setInitialFetch] = useState(true);
  const skipUpdateRef = useRef(false);
  useEffect(() => {
    const handleUpdate = async () => {
      if (initialFetch || skipUpdateRef.current) {
        skipUpdateRef.current = false;
        setInitialFetch(false);
        return;
      }
  
      console.log('Attempting to update data:', data);
  
      const formattedData = data.map((row) => ({
        firstName: row.firstName || '',
        lastName: row.lastName || '',
        age: row.age || '',
        visits: row.visits || '',
        progress: row.progress || '',
        status: row.status || '',
      }));
  
      console.log('Formatted data:', formattedData);
      console.log(params.id);
  
      // Function to update data in the database
      updateTextData(params.id, formattedData);
    };
  
    handleUpdate();
  }, [data, initialFetch]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase
        .from('Text')
        .select('data')
        .eq('id', params.id)
        .single();
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', fetchedData);
  
        if (!deepEqual(fetchedData.data, data)) {
          skipUpdateRef.current = true; // Skip the next update if it's due to initial fetch
          setData(fetchedData.data);
        }
  
        setInitialFetch(false);
      }
    };
  
    fetchData();
  
    // Set up real-time listener for the specific row
    const channel = supabase
      .channel('specific-text-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Text',
          filter: `id=eq.${params.id}`
        },
        (payload) => {
          console.log('Change received!', payload);
  
          if (!deepEqual(payload.new.data, data)) {
            skipUpdateRef.current = true; // Skip the next update if it's due to real-time sync
            setData(payload.new.data);
          }
        }
      )
      .subscribe();
  
    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id, supabase]);
  // const updatePendingRef = useRef(false);

  // useEffect(() => {
  //   const handleUpdate = async () => {
  //     // if (!updatePendingRef.current || !Array.isArray(data) || data.length === 0) return;
  
  //     console.log('Attempting to update data:', data);
  
  //     const formattedData = data.map((row) => ({
  //       firstName: row.firstName || '',
  //       lastName: row.lastName || '',
  //       age: row.age || '',
  //       visits: row.visits || '',
  //       progress: row.progress || '',
  //       status: row.status || '',
  //     }));
  
  //     console.log('Formatted data:', formattedData);
  //     console.log(params.id);
  //     updateTextData(params.id,formattedData)
  // //     try {
  // //       const { data: existingData, error: fetchError } = await supabase
  // // .from('Text')
  // // .select('*')
  // // .eq('id', params.id)
  // // .single();
  // //       console.log(existingData);
  //       // const { data: updatedData, error } = await supabase
  //       //   .from('Text')
  //       //   .update({ data: formattedData })
  //       //   .eq('id', params.id);
  
  //       // if (error) {
  //       //   console.error('Supabase error:', error.message);
  //       // } else {
  //       //   console.log('Data updated successfully:', updatedData);
  //       // }
  
  //       // updatePendingRef.current = false;
  //     // } catch (error) {
  //     //   console.error('Error updating data:', error);
  //     //   // updatePendingRef.current = false;
  //     // }
  //   };
  //   handleUpdate();
  //   // const debouncedUpdate = debounce(handleUpdate, 500);
  
  //   // if (data.length > 0) {
  //   //   updatePendingRef.current = true;
  //   //   debouncedUpdate();
  //   // }
  
  //   // return () => {
  //   //   debouncedUpdate.cancel();
  //   // };
  // }, [data]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from('Text')
  //       .select('data')
  //       .eq('id', params.id)
  //       .single();

  //     if (error) {
  //       console.error('Error fetching data:', error);
  //     } else {
  //       console.log('Fetched data:', data);
  //       setData(data.data);
  //     }
  //   };

  //   fetchData();

  //   // Set up real-time listener for the specific row
  //   const channel = supabase
  //     .channel('specific-text-changes')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: 'UPDATE',
  //         schema: 'public',
  //         table: 'Text',
  //         filter: `id=eq.${params.id}`
  //       },
  //       (payload) => {
  //         console.log('Change received!', payload);
  //         setData(payload.new.data);
  //       }
  //     )
  //     .subscribe();

  //   // Cleanup function
  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [params.id,supabase]);
  const downloadCsv = () => {
    const headers = [
      "firstName",
      "lastName",
      "age",
      "visits",
      "progress",
      "status",
    ];

    const formattedData = data.map((row) => ({
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      age: row.age || '',
      visits: row.visits || '',
      progress: row.progress || '',
      status: row.status || '',
    }));
    csvDownload({
      filename: `file-${params.id}.csv`,
      delimiter: ",",
      headers: headers,
      data: formattedData,
    });
  };
  
  

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    debugHeaders: true,
    debugColumns: true,
    // getPaginationRowModel: getPaginationRowModel(),
    // autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow = {
          firstName: "",
          lastName: "",
          age: "",
          visits: "",
          progress: "",
          status: "",
        };
        const setFunc = (old) => [...old, newRow];
        setData(setFunc);
      },
    },
    debugTable: true,
  });
  // console.log(data);
  return (
    <div className="p-2">
      <Button className="border bg-green-300 text-lg" onClick={downloadCsv}>Save File<Plus></Plus></Button>
      <Button
          onClick={async () => {
            await navigator.clipboard.writeText(
              `${window.location.origin}/file/${params.id}`,
            );
            toast({
                title: "Link Copied",
                description: "Share it with your friends!",
            })
          }}
        >
          Copy Link
      </Button>
      <div className="h-2 overflow-x-auto" />
      <table {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                {...{
                  key: header.id,
                  colSpan: header.colSpan,
                  style: {
                    width: header.getSize(),
                  },
                }}
              >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                          style: {
                            transform:
                              columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection ===
                                    'rtl'
                                      ? -1
                                      : 1) *
                                    (table.getState().columnSizingInfo
                                      .deltaOffset ?? 0)
                                  }px)`
                                : '',
                          },
                        }}
                      />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                {...{
                  key: cell.id,
                  style: {
                    width: cell.column.getSize(),
                  },
                }}
              >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
      <div className="h-2" />
      
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </div>
  );
}

function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue?.[0] ?? '')}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue?.[1] ?? '')}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '')}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}