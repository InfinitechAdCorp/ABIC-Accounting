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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
  useDisclosure,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@heroui/react";
import { Column } from "@/components/globals/types";
import ExportBtn from "@/components/globals/exportBtn";
import { dateToDateValue, dateValueToDate } from "@/components/globals/utils";
import { Formik, Form, Field, FieldProps } from "formik";
import { filter as validationSchema } from "@/components/globals/schemas";
import { Filter } from "@/components/globals/types";

type Props = {
  baseModel: string;
  model?: string;
  columns: Column[];
  initialColumns?: string[];
  records: any[];
  filterKey?: string;
  dependencies?: any;
  RenderBody: (columns: Column[], records: any[], dependencies: any) => any;
  Buttons?: ReactElement;
  SideContent?: ReactElement;
};

const DataTable = ({
  baseModel,
  model,
  columns: ufColumns,
  initialColumns: ufInitialColumns,
  records: ufRecords,
  filterKey,
  dependencies,
  RenderBody,
  Buttons,
  SideContent,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialColumns = ufInitialColumns || [];
  if (initialColumns.length == 0) {
    ufColumns.forEach((ufColumn) => {
      initialColumns.push(ufColumn.key);
    });
  }
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns)
  );

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

  const columns = useMemo(() => {
    return ufColumns.filter((ufColumn) =>
      Array.from(visibleColumns).includes(ufColumn.key)
    );
  }, [visibleColumns]);

  const dateFilteredRecords = useMemo(() => {
    if (range.start && range.end) {
      const start = (range.start as Date).toLocaleDateString("en-CA");
      const end = (range.end as Date).toLocaleDateString("en-CA");

      if (filterKey) {
        const filteredRecords = ufRecords.filter((record) => {
          const date = record[filterKey].toLocaleDateString("en-CA");
          return date >= start && date <= end;
        });
        return filteredRecords;
      }
    } else {
      return ufRecords;
    }
  }, [range, ufRecords, filterKey]);

  const searchFilteredRecords = useMemo(() => {
    let filteredRecords = [...(dateFilteredRecords || ufRecords)];

    filteredRecords = filteredRecords.filter((record) => {
      const isValid = columns.some((column) => {
        const value = record.display_format[column.key];
        if (value) {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        }
      });

      if (isValid) return record;
    });

    return filteredRecords;
  }, [filterValue, ufRecords, dateFilteredRecords]);

  const pages = Math.ceil(searchFilteredRecords.length / rowsPerPage);

  const records = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return searchFilteredRecords.slice(start, end);
  }, [page, searchFilteredRecords, rowsPerPage]);

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, records]);

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

  const Filter = useMemo(() => {
    const initialValues = range;

    const onSubmit = (values: Filter) => {
      setRange({ start: values.start, end: values.end });
      onClose();
    };

    const reset = () => {
      setRange({ start: "", end: "" });
      onClose();
    };

    return (
      <>
        <Button size="md" color="primary" onPress={onOpen}>
          Filter
        </Button>

        <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form>
                      <ModalHeader>Filter {baseModel}</ModalHeader>
                      <ModalBody>
                        <div className="grid grid-cols-2 gap-3">
                          <Field name="start">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <DatePicker
                                  {...field}
                                  inert={false}
                                  showMonthAndYearPickers
                                  size="md"
                                  variant="bordered"
                                  label="Start Date"
                                  labelPlacement="outside"
                                  value={dateToDateValue(field.value)}
                                  onChange={(value) => {
                                    const date = dateValueToDate(value);
                                    props.setFieldValue(field.name, date);
                                  }}
                                />
                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>

                          <Field name="end">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <DatePicker
                                  {...field}
                                  inert={false}
                                  showMonthAndYearPickers
                                  size="md"
                                  variant="bordered"
                                  label="End Date"
                                  labelPlacement="outside"
                                  value={dateToDateValue(field.value)}
                                  onChange={(value) => {
                                    const date = dateValueToDate(value);
                                    props.setFieldValue(field.name, date);
                                  }}
                                />
                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Filter
                        </Button>
                        <Button color="danger" onPress={reset}>
                          Reset
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }, [isOpen, onOpen, onOpenChange, onClose, baseModel, range, end, start]);

  const topContent = useMemo(() => {
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
              {filterKey && Filter}
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button color="primary">Columns</Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {ufColumns.map((ufColumn) => (
                    <DropdownItem key={ufColumn.key}>
                      {ufColumn.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </>
    );
  }, [
    onRowsPerPageChange,
    filterValue,
    onSearchChange,
    onClear,
    columns,
    records,
    filterKey,
    Buttons,
    Filter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="px-2 flex justify-between items-center">
        <span className="w-[30%] text-default-400 text-small">
          Total: {records.length}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <label className="flex w-[30%] justify-end items-center gap-1 text-default-400 text-small">
          Rows:
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
    );
  }, [page, pages, records]);

  return (
    <>
      <Card radius="none" className="py-[0.10rem] px-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{model || baseModel}</h3>

            <div className="flex gap-3">
              {Buttons}
              <ExportBtn
                model={baseModel}
                columns={columns}
                records={records}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="m-5 md:my-7 md:mx-32 p-3">
        <CardBody>
          <Table
            aria-label="DataTable"
            isHeaderSticky
            bottomContent={bottomContent}
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
