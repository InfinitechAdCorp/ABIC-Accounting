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
  Chip,
} from "@nextui-org/react";
import {
  FormattedCollection,
  FormattedCollectionClient,
} from "@/components/collectionMonitoring/types";
import { formatDate, formatNumber } from "@/components/globals/utils";
import CreateCollectionModal from "@/components/collectionMonitoring/collections/createModal";
import UpdateModal from "@/components/collectionMonitoring/collections/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import PaymentModal from "@/components/collectionMonitoring/collections/paymentModal";
import {
  destroy,
  markAsPaid,
} from "@/components/collectionMonitoring/collections/actions";
import CreateClientModal from "@/components/collectionMonitoring/collectionClients/createModal";
import { differenceInDays, differenceInMonths } from "date-fns";

type column = {
  name: string;
  key: string;
  sortable?: boolean;
};

type Props = {
  model: string;
  columns: column[];
  rows: FormattedCollection[];
  searchKey: string;
  locations: {
    key: string;
    name: string;
  }[];
  collectionClients: FormattedCollectionClient[];
};

const DataTable = ({
  model,
  columns,
  rows,
  searchKey,
  locations,
  collectionClients,
}: Props) => {
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

  const renderCell = React.useCallback(
    (row: Row, columnKey: string) => {
      const dateColumns = ["start", "end", "due"];
      const moneyColumns = ["tenant_price", "owner_income", "abic_income"];

      if (columnKey == "actions") {
        return (
          <div className="relative flex justify-end items-center gap-2">
            <UpdateModal
              collection={row}
              locations={locations}
              collectionClients={collectionClients}
            />
            <DestroyModal title="Collection" action={destroy} id={row.id} />
            <PaymentModal action={markAsPaid} id={row.id} />
          </div>
        );
      } else if (columnKey == "client") {
        return row.collection_client?.name;
      } else if (dateColumns.includes(columnKey)) {
        return formatDate(row[columnKey as keyof Row] as Date);
      } else if (moneyColumns.includes(columnKey)) {
        return formatNumber(row[columnKey as keyof Row] as number);
      } else if (columnKey == "status") {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const difference = differenceInDays(
          row.due.setHours(0, 0, 0, 0),
          today
        );

        type Color =
          | "default"
          | "primary"
          | "secondary"
          | "success"
          | "warning"
          | "danger";

        let color;
        let status;
        if (difference > 0) {
          color = "success";
          status = `${difference} Days Remaining`;
        } else if (difference < 0) {
          color = "danger";
          status = `${difference} Days Past Due`.replace("-", "");
        } else if (difference == 0) {
          color = "primary";
          status = "Today";
        }

        return (
          <Chip color={color as Color} size="sm" variant="flat">
            {status}
          </Chip>
        );
      } else if (columnKey == "payments") {
        let payments = differenceInMonths(row.due, row.start) - 1;
        if (payments < 0) {
          payments = 0;
        }
        return payments;
      } else {
        return row[columnKey as keyof Row];
      }
    },
    [locations, collectionClients]
  );

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
              <div className="hidden sm:flex">
                <CreateClientModal />
              </div>
              <CreateCollectionModal
                locations={locations}
                collectionClients={collectionClients}
              />
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
    locations,
    collectionClients,
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