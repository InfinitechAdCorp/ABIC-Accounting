"use client";

import React from "react";
import { Button } from "@heroui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  columns: {
    key: string;
    name: string;
  }[];
  rows: any[];
};

const ExportBtn = ({ columns: ufColumns, rows: ufRows }: Props) => {
  const formatColumns = (
    ufColumns: {
      key: string;
      name: string;
    }[]
  ) => {
    const columns: string[] = [];

    ufColumns.forEach((ufColumn) => {
      columns.push(ufColumn.name);
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

  const onPress = () => {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [columns],
      body: rows,
      theme: "grid",
    });
    doc.save("table.pdf");
  };

  return (
    <Button color="primary" onPress={onPress}>
      Export
    </Button>
  );
};

export default ExportBtn;
