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
  DateRangePicker,
  useDisclosure,
} from "@heroui/react";
import { Column } from "@/components/globals/types";
import ExportBtn from "@/components/globals/exportBtn";
import { dateToDateValue, dateValueToDate } from "@/components/globals/utils";
import { Formik, Form, Field, FieldProps } from "formik";
import { filter as validationSchema } from "@/components/globals/schemas";
import { Filter } from "@/components/globals/types";

type Props = {
  model: string;
  columns: Column[];
  records: any[];
  filterKey?: string;
  dependencies?: any;
  RenderBody: (columns: Column[], records: any[], dependencies: any) => any;
  Buttons: ReactElement;
};

const DataTable = ({
  model,
  columns,
  records: ufRecords,
  filterKey = "created_at",
  dependencies,
  RenderBody,
  Buttons,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const start = dateToDateValue(new Date(1900, 0, 1))!;
  const end = dateToDateValue(new Date(2099, 12, 0))!;

  const [range, setRange] = useState({
    start: start,
    end: end,
  });

  const dateFilteredRecords = useMemo(() => {
    const start = dateValueToDate(range.start)!.toLocaleDateString("en-CA");
    const end = dateValueToDate(range.end)!.toLocaleDateString(
      "en-CA"
    ) as string;

    const filteredRecords = ufRecords.filter((ufRecord) => {
      const date = ufRecord[filterKey].toLocaleDateString("en-CA");
      return date >= start && date <= end;
    });
    return filteredRecords;
  }, [range, ufRecords, filterKey]);

  const searchFilteredRecords = useMemo(() => {
    let filteredRecords = [...dateFilteredRecords];

    if (hasSearchFilter) {
      filteredRecords = filteredRecords.filter((record) => {
        const values: string[] = Object.values(record.display_format);

        const isValid = values.some((value) => {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        });

        if (isValid) return record;
      });
    }

    return filteredRecords;
  }, [filterValue, hasSearchFilter, dateFilteredRecords]);

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
    const initialValues = {
      range: range,
    };

    const onSubmit = (values: Filter) => {
      setRange({ start: values.range.start, end: values.range.end });
      onClose();
    };

    const reset = () => {
      setRange({ start: start, end: end });
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
                      <ModalHeader>Export {model}</ModalHeader>
                      <ModalBody>
                        <Field name="range">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <DateRangePicker
                                {...field}
                                label="Select Date Range"
                                labelPlacement="outside"
                                onChange={(value) => {
                                  const range = {
                                    start: value?.start,
                                    end: value?.end,
                                  };
                                  props.setFieldValue(field.name, range);
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
  }, [isOpen, onOpen, onOpenChange, onClose, model, range, end, start]);

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
              {Filter}
              <ExportBtn model={model} columns={columns} records={records} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {records.length}
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
    onRowsPerPageChange,
    filterValue,
    onSearchChange,
    onClear,
    model,
    columns,
    records,
    Buttons,
    Filter,
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
          {RenderBody(columns, sortedRecords, dependencies)}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
