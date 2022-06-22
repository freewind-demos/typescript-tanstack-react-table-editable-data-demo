import React, {FC} from 'react'

import {
  createTable,
  getCoreRowModel,
  useTableInstance,
  CoreColumnDef,
  Render,
  VisibilityColumnDef,
  ColumnSizingColumnDef,
  ColumnPinningColumnDef,
  FiltersColumnDef,
  SortingColumnDef,
  GroupingColumnDef,

} from '@tanstack/react-table'
import {Person, defaultData} from './data';
import {ColumnDef} from '@tanstack/table-core/build/types/types';
import {TableInstance} from '@tanstack/table-core';
import '@tanstack/table-core/build/types/createTable';

const table = createTable().setRowType<Person>()


export const defaultColumns = [
  table.createDataColumn('firstName', {
    cell: info => info.getValue(),
    footer: props => props.column.id,
  }),
  table.createDataColumn(row => row.lastName, {
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: props => props.column.id,
  }),
  table.createDataColumn('age', {
    header: () => 'Age',
    footer: props => props.column.id,
  }),
  table.createDataColumn('visits', {
    header: () => <span>Visits</span>,
    footer: props => props.column.id,
  }),
  table.createDataColumn('status', {
    header: 'Status',
    footer: props => props.column.id,
  }),
  table.createDataColumn('progress', {
    header: 'Profile Progress',
    footer: props => props.column.id,
  }),
]

export const Table: FC = () => {

  const instance = useTableInstance(table, {
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table border={1}>
        <thead>
        {instance.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {instance.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
        </tbody>
        <tfoot>
        {instance.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : header.renderFooter()}
              </th>
            ))}
          </tr>
        ))}
        </tfoot>
      </table>
      <div/>
    </div>
  )
};
