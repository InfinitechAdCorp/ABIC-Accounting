"use client";

import React from "react";
import { SearchIcon, ChevronDownIcon } from "@/components/globals/icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
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
  initialVisibleColumns: string[];
  searchKey: string;
  sortKey: string;
  locations: {
    key: string;
    name: string;
  }[];
  accountID: string;
  collectionClients: FormattedCollectionClient[];
};

const DataTable = ({
  model,
  columns,
  rows,
  initialVisibleColumns,
  searchKey,
  sortKey,
  locations,
  accountID,
  collectionClients,
}: Props) => {
  type Row = (typeof rows)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(initialVisibleColumns)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: sortKey,
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [columns, visibleColumns]);

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

  const sortedItems = React.useMemo(() => {
    if (sortDescriptor.direction == "ascending") {
      return [...items].sort();
    } else {
      return [...items].sort().reverse();
    }
  }, [sortDescriptor, items]);

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

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key}>{column.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <div className="hidden sm:flex">
              <CreateClientModal accountID={accountID} />
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
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    onClear,
    columns,
    model,
    rows.length,
    locations,
    accountID,
    collectionClients,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="p2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);

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
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={`No ${model} found`} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey) as React.ReactNode}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
