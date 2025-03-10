"use client";

import React, { ChangeEvent } from "react";
import { Pagination } from "@heroui/react";

type Props = {
  total: number;
  page: number;
  pages: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  onSelectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const BottomContent = ({
  total,
  page,
  pages,
  onChange,
  onSelectionChange,
}: Props) => {
  return (
    <div className="px-2 flex justify-between items-center">
      <span className="w-[30%] text-default-400 text-small">
        Total: {total}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={onChange}
      />
      <label className="flex w-[30%] justify-end items-center gap-1 text-default-400 text-small">
        Rows:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={onSelectionChange}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </label>
    </div>
  );
};

export default BottomContent;
