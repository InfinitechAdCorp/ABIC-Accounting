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
  rows: any[];
};

const ExportBtn = ({ model, columns: ufColumns, rows: ufRows }: Props) => {
  const excluded = ["id", "actions"];

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

  const formatRows = (ufRows: any[]) => {
    const rows: string[][] = [];

    ufRows.forEach((ufRow) => {
      const row: string[] = [];
      ufColumns.forEach((ufColumn) => {
        if (!excluded.includes(ufColumn.key)) {
          row.push(ufRow[ufColumn.key]);
        }
      });
      rows.push(row);
    });

    return rows;
  };

  const rows = formatRows(ufRows);

  const onPress = () => {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [columns],
      body: rows,
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
