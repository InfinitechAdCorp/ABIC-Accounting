import React from "react";
import DataTable from "@/components/globals/dataTable/dataTable";
import { Card, CardBody } from "@nextui-org/react";

const Table = () => {
  return (
    <>
      <div className="flex justify-center gap-5">
        <Card className="my-5 p-3">
          <CardBody>
            <DataTable />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Table;
