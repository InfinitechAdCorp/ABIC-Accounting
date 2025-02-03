"use client";

import React from "react";
import { SearchIcon } from "@/components/globals/icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
} from "@nextui-org/react";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";
import { formatNumber } from "@/components/globals/utils";
import CreateModal from "@/components/transactionHistory/transactionClients/createModal";
import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import { destroy } from "@/components/transactionHistory/transactionClients/actions";

type column = {
  name: string;
  key: string;
  sortable?: boolean;
};

type Props = {
  model: string;
  columns: column[];
  rows: FormattedTransactionClient[];
  searchKey: string;
};

const DataTable = ({ model, columns, rows, searchKey }: Props) => {
  type Row = (typeof rows)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredRows = [...rows];

    if (hasSearchFilter) {
      filteredRows = filteredRows.filter((row) => {
        return (row[searchKey as keyof Row] as string)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    return filteredRows;
  }, [rows, filterValue, hasSearchFilter, searchKey]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((row: Row, columnKey: string) => {
    const transactions = row.transactions || [];

    if (columnKey == "actions") {
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal transactionClient={row} />
          <DestroyModal title="Client" action={destroy} id={row.id} />
        </div>
      );
    } else if (columnKey == "starting_balance") {
      let startingBalance = 0;
      const transaction = transactions[0];
      if (transaction) {
        if (transaction.type == "Credit") {
          startingBalance += transaction.amount;
        } else {
          startingBalance -= transaction.amount;
        }
      }
      return formatNumber(startingBalance);
    } else if (columnKey == "current_balance") {
      let currentBalance = 0;
      if (transactions) {
        transactions.forEach((transaction) => {
          if (transaction.type == "Credit") {
            currentBalance += transaction.amount;
          } else {
            currentBalance -= transaction.amount;
          }
        });
      }
      return formatNumber(currentBalance);
    } else if (columnKey == "transactions") {
      return row.transactions?.length;
    } else {
      return row[columnKey as keyof Row];
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        <h1 className="text-lg font-semibold mb-3">{model}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search"
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <CreateModal />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {rows.length} {model}
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    onClear,
    model,
    rows.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="p2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <>
      <Table
        aria-label="DataTable"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[400px]",
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={`No ${model} Found`} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;