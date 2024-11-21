import React from "react";
import DataTable from "@/components/table/dataTable";
import DataTable2 from "@/components/globals/dataTable";
import { Card, CardBody } from "@nextui-org/react";

const Table = () => {
  return (
    <>
      <div className="flex justify-center gap-5">
        {/* <Card className="my-5 p-3">
          <CardBody>
            <DataTable />
          </CardBody>
        </Card> */}

        <Card className="my-5 p-3">
          <CardBody>
            <DataTable2 />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Table;
