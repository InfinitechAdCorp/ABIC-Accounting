"use client";

import React from "react";
import { Button } from "@heroui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Props = {
  columns?: string[];
  rows?: any[];
};

const ExportBtn = ({ columns, rows }: Props) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: "#datatable",
      theme: "grid",
    })
    // autoTable(doc, {
    //   head: [columns],
    //   body: rows,
    //   theme: "grid",
    // });
    doc.save("table.pdf");
  };

  return (
    <Button color="primary" onPress={exportPDF}>
      Export
    </Button>
  );
};

export default ExportBtn;
