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
} from "@heroui/react";

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

  const formatColumns = (
    ufColumns: {
      key: string;
      name: string;
    }[]
  ) => {
    const excluded = ["id", "actions"];
    const columns: string[] = [];

    ufColumns.forEach((ufColumn) => {
      if (excluded.includes(ufColumn.key)) {
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

  const rows = formatRows(ufRows);

  // const onPress = () => {
  //   const doc = new jsPDF("l");
  //   autoTable(doc, {
  //     head: [columns],
  //     body: rows,
  //     theme: "grid",
  //   });
  //   doc.save("table.pdf");
  // };

  return (
    <>
      <Button size="md" color="primary" title="Export" onPress={onOpen}>
        Export
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Export {model}</ModalHeader>
              <ModalBody>
                <DateRangePicker className="max-w-xs" label="Date Range" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Export
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExportModal;
