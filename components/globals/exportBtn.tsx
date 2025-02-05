"use client";

import React from "react";
import { Button } from "@heroui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportBtn = () => {
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: "#dataTable", theme: "grid" });
    doc.save("table.pdf");
  };

  return (
    <Button color="primary" onPress={exportPDF}>
      Export
    </Button>
  );
};

export default ExportBtn;
