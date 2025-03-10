"use client";

import React from "react";
import { Column } from "@/components/globals/types";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@heroui/react";

type Props = {
  columns: Column[];
  visibleColumns: Selection;
  onSelectionChange: React.Dispatch<React.SetStateAction<Selection>>;
};

const ColumnsDropdown = ({
  columns,
  visibleColumns,
  onSelectionChange,
}: Props) => {
  return (
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
        onSelectionChange={onSelectionChange}
      >
        {columns.map((column) => (
          <DropdownItem key={column.key}>{column.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ColumnsDropdown;
