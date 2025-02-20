"use client";

import React from "react";
import { Button } from "@heroui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  model: string;
  columns: {
    key: string;
    name: string;
  }[];
  records: any[];
};

const ExportBtn = ({
  model,
  columns: ufColumns,
  records: ufRecords,
}: Props) => {
  const excluded = ["actions"];

  const formatColumns = (
    ufColumns: {
      key: string;
      name: string;
    }[]
  ) => {
    const columns: string[] = [];

    ufColumns.forEach((ufColumn) => {
      if (!excluded.includes(ufColumn.key)) {
        columns.push(ufColumn.name);
      }
    });

    return columns;
  };

  const columns = formatColumns(ufColumns);

  const formatRecords = (ufRecords: any[]) => {
    const formattedRecords: string[][] = [];

    ufRecords.forEach((ufRecord) => {
      const formattedRecord: string[] = [];
      ufColumns.forEach((ufColumn) => {
        if (!excluded.includes(ufColumn.key)) {
          formattedRecord.push(ufRecord.display_format[ufColumn.key]);
        }
      });
      formattedRecords.push(formattedRecord);
    });

    return formattedRecords;
  };

  const formattedRecords = formatRecords(ufRecords);

  const onPress = () => {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [columns],
      body: formattedRecords,
      theme: "grid",
    });
    doc.save(`${model}.pdf`);
  };

  return (
    <Button color="primary" onPress={onPress}>
      Export
    </Button>
  );
};

export default ExportBtn;
