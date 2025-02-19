"use client";

import React, {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { SearchIcon } from "@/components/globals/icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Input,
  Pagination,
  SortDescriptor,
} from "@heroui/react";
import { Column } from "@/components/globals/types";
import ExportRangeModal from "@/components/globals/exportRangeModal";
import ExportBtn from "@/components/globals/exportBtn";
import DateRangeModal from "@/components/globals/dateRangeModal";

type Props = {
  model: string;
  records: any[];
  columns: Column[];
  rows: any[];
  filterKey?: string;
  dependencies?: any;
  RenderBody: (
    records: any[],
    columns: Column[],
    rows: any[],
    dependencies: any
  ) => any;
  Buttons: ReactElement;
};

const DataTable = ({
  model,
  records,
  columns: ufColumns,
  rows,
  filterKey,
  dependencies,
  RenderBody,
  Buttons,
}: Props) => {
  const columns = ufColumns.filter((ufColumn) => {
    return ufColumn.key != "id";
  });

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const filteredItems = useMemo(() => {
    let filteredRows = [...rows];

    if (hasSearchFilter) {
      filteredRows = filteredRows.filter((row) => {
        const values: string[] = Object.values(row);

        const isValid = values.some((value) => {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        });

        if (isValid) return row;
      });
    }

    return filteredRows;
  }, [rows, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const ExportComponent = useMemo(() => {
    if (filterKey) {
      return (
        <ExportRangeModal
          model={model}
          columns={columns}
          rows={items}
          filterKey={filterKey}
        />
      );
    } else {
      return <ExportBtn model={model} columns={columns} rows={items} />;
    }
  }, [columns, filterKey, items, model]);

  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder={`Search`}
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={onClear}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              {Buttons}
              <DateRangeModal model={model} />
              {ExportComponent}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {rows.length}
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
    onClear,
    onRowsPerPageChange,
    rows.length,
    Buttons,
    ExportComponent,
  ]);

  const bottomContent = useMemo(() => {
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
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={`No ${model} Found`}>
          {RenderBody(records, columns, sortedItems, dependencies)}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
