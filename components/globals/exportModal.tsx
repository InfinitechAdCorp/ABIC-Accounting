"use client";

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DateRangePicker,
  useDisclosure,
  CalendarDate,
} from "@heroui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { exportAsPDF as validationSchema } from "@/components/globals/schemas";
import { ExportAsPDF } from "@/components/globals/types";
import {
  dateToDateValue,
  dateValueToDate,
  stringToDate,
} from "@/components/globals/utils";

type Props = {
  model: string;
  columns: {
    key: string;
    name: string;
  }[];
  rows: any[];
};

const ExportModal = ({ model, columns: ufColumns, rows: ufRows }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const today = dateToDateValue(
    new Date(new Date().setHours(0, 0, 0, 0))
  ) as CalendarDate;

  const initialValues = {
    range: {
      start: today,
      end: today,
    },
  };

  const formatColumns = (
    ufColumns: {
      key: string;
      name: string;
    }[]
  ) => {
    const excluded = ["id", "actions"];
    const columns: string[] = [];

    ufColumns.forEach((ufColumn) => {
      if (!excluded.includes(ufColumn.key)) {
        columns.push(ufColumn.name);
      }
    });

    return columns;
  };

  const columns = formatColumns(ufColumns);

  const formatRows = (ufRows: any[]) => {
    const rows: string[][] = [];

    ufRows.forEach((ufRow) => {
      const row: string[] = [];
      ufColumns.forEach((ufColumn) => {
        row.push(ufRow[ufColumn.key]);
      });
      rows.push(row);
    });

    return rows;
  };

  const onSubmit = async (
    values: ExportAsPDF,
    actions: { resetForm: () => void }
  ) => {
    const start = dateValueToDate(values.range.start)?.toLocaleDateString(
      "en-CA"
    ) as string;
    const end = dateValueToDate(values.range.end)?.toLocaleDateString(
      "en-CA"
    ) as string;

    const fRows = ufRows.filter((ufRow) => {
      const date = stringToDate(ufRow.date);
      return date >= start && date <= end;
    });

    const rows = formatRows(fRows);
    exportAsPDF(rows);

    actions.resetForm();
    onClose();
  };

  const exportAsPDF = (rows: string[][]) => {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [columns],
      body: rows,
      theme: "grid",
    });
    doc.save("table.pdf");
  };

  return (
    <>
      <Button size="md" color="primary" title="Export" onPress={onOpen}>
        Export
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
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
                              label="Select Date Range to Export From"
                              labelPlacement="outside"
                              defaultValue={field.value}
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
                        Export
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
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
};

export default ExportModal;
