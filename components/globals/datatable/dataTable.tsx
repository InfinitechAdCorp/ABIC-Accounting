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
  SortDescriptor,
  Card,
  CardBody,
  Selection,
} from "@heroui/react";
import { Column } from "@/components/globals/types";
import { Filter } from "@/components/globals/types";
import DateFilter from "@/components/globals/datatable/dateFilter";
import BottomContent from "@/components/globals/datatable/bottomContent";
import HeaderContent from "@/components/globals/datatable/headerContent";
import ColumnsDropdown from "@/components/globals/datatable/columnsDropdown";

type Props = {
  baseModel: string;
  model?: string;
  columns: Column[];
  initialColumns?: string[];
  records: any[];
  filterKey?: string;
  RenderBody: (columns: Column[], records: any[], dependencies: any) => any;
  Buttons?: ReactElement;
  SideContent?: ReactElement;
  dependencies?: any;
};

const DataTable = ({
  baseModel,
  model,
  columns: ufColumns,
  initialColumns: ufInitialColumns,
  records: ufRecords,
  filterKey,
  RenderBody,
  Buttons,
  SideContent,
  dependencies,
}: Props) => {
  const initialColumns = ufInitialColumns || [];
  if (initialColumns.length == 0) {
    ufColumns.forEach((ufColumn) => {
      initialColumns.push(ufColumn.key);
    });
  }

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns)
  );
  const columns = useMemo(() => {
    return ufColumns.filter((ufColumn) =>
      Array.from(visibleColumns).includes(ufColumn.key)
    );
  }, [visibleColumns]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const start = "";
  const end = "";
  const [range, setRange] = useState<{
    start: Date | string;
    end: Date | string;
  }>({
    start: start,
    end: end,
  });

  const dateFilteredRecords = useMemo(() => {
    const unfiltered = ufRecords;

    if (range.start && range.end) {
      const start = (range.start as Date).toLocaleDateString("en-CA");
      const end = (range.end as Date).toLocaleDateString("en-CA");

      if (filterKey) {
        const filtered = unfiltered.filter((record) => {
          const date = record[filterKey].toLocaleDateString("en-CA");
          return date >= start && date <= end;
        });
        return filtered;
      }
    } else {
      return unfiltered;
    }
  }, [range, ufRecords, filterKey]);

  const searchFilteredRecords = useMemo(() => {
    const unfiltered = [...(dateFilteredRecords || ufRecords)];

    const filtered = unfiltered.filter((record) => {
      const isValid = columns.some((column) => {
        const value = record.display_format[column.key];
        if (value) {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        }
      });

      if (isValid) return record;
    });

    return filtered;
  }, [filterValue, ufRecords, dateFilteredRecords]);

  const records = useMemo(() => {
    const unfiltered = searchFilteredRecords;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const filtered = unfiltered.slice(start, end);
    return filtered;
  }, [page, searchFilteredRecords, rowsPerPage]);

  const sortedRecords = useMemo(() => {
    const unfiltered = records;

    const filtered = [...unfiltered].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return filtered;
  }, [sortDescriptor, records]);

  const pages = Math.ceil(searchFilteredRecords.length / rowsPerPage);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = useMemo(() => {
    const onSearchChange = (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    };

    const onClear = () => {
      setFilterValue("");
      setPage(1);
    };

    const initialValues = range;

    const onSubmit = (values: Filter) => {
      setRange({ start: values.start, end: values.end });
    };

    const onReset = () => {
      setRange({ start: "", end: "" });
    };

    return (
      <>
        {SideContent}

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <div className="w-full sm:max-w-[50%]">
              <Input
                isClearable
                placeholder={`Search`}
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={onClear}
                onValueChange={onSearchChange}
              />
            </div>

            <div className="flex justify-end gap-2">
              {filterKey && (
                <DateFilter
                  baseModel={baseModel}
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  onReset={onReset}
                />
              )}

              <ColumnsDropdown
                columns={ufColumns}
                visibleColumns={visibleColumns}
                onSelectionChange={setVisibleColumns}
              />
            </div>
          </div>
        </div>
      </>
    );
  }, [filterValue, columns]);

  return (
    <>
      <HeaderContent
        model={model || baseModel}
        columns={columns}
        records={records}
        Buttons={Buttons}
      />

      <Card className="m-5 md:my-7 md:mx-32 p-3">
        <CardBody>
          <Table
            aria-label="DataTable"
            isHeaderSticky
            bottomContent={
              <BottomContent
                total={records.length}
                page={page}
                pages={pages}
                onChange={setPage}
                onSelectionChange={onRowsPerPageChange}
              />
            }
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[40rem]",
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
            <TableBody emptyContent={`No ${baseModel} Found`}>
              {RenderBody(columns, sortedRecords, dependencies)}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default DataTable;
