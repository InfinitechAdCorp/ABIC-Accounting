"use client";

import React, { ReactNode } from "react";
import { Column } from "@/components/globals/types";
import ExportBtn from "@/components/globals/exportBtn";
import { Card, CardBody } from "@heroui/react";

type Props = {
  model: string;
  columns: Column[];
  records: any[];
  Buttons: ReactNode;
};

const HeaderContent = ({ model, columns, records, Buttons }: Props) => {
  return (
    <Card radius="none" className="py-[0.10rem] px-2">
      <CardBody>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{model}</h3>

          <div className="flex gap-3">
            {Buttons}
            <ExportBtn model={model} columns={columns} records={records} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default HeaderContent;
