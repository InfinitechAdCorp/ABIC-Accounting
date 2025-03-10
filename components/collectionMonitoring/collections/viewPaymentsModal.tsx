"use client";

import React from "react";
import { Collection } from "@/components/collectionMonitoring/types";
import {
  eachMonthOfInterval,
  setDate,
  addMonths,
  differenceInDays,
} from "date-fns";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import { FaEye } from "react-icons/fa";

type Props = {
  record: Collection;
};

const ViewPaymentsModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dueDay = new Date(record.start).getDate();

  const dates = eachMonthOfInterval({
    start: addMonths(record.start, 1),
    end: record.due,
  });

  const ufPayments: { date: Date; status: string }[] = [];

  dates.forEach((date) => {
    const formattedDate = setDate(date, dueDay);
    const difference = differenceInDays(formattedDate, record.due);
    const payment = {
      date: formattedDate,
      status: difference < 0 ? "Paid" : "",
    };
    ufPayments.push(payment);
  });

  console.log(ufPayments);

  // const ufPdcs = record.pdcs || [];

  // const [page, setPage] = useState(1);
  // const rowsPerPage = 4;
  // const pages = Math.ceil(ufPdcs.length / rowsPerPage);

  // const pdcs = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return ufPdcs.slice(start, end);
  // }, [page, ufPdcs]);

  // const columns = ["DATE", "CHECK", "AMOUNT"];

  // const hasLine = (date: Date) => {
  //   let result = "";
  //   const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
  //   if (date) {
  //     const difference = differenceInDays(date.setUTCHours(0, 0, 0, 0), today);
  //     difference <= 0 ? (result = "line-through") : (result = "");
  //   }
  //   return result;
  // };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="View PDCs"
        onPress={onOpen}
      >
        <FaEye size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="py-3">
                <div>
                  <h3 className="text-md font-bold">{record.c_client?.name}</h3>
                  <h3 className="text-sm font-semibold">{record.property}</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <Table
                  aria-label="PDCs Table"
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={setPage}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: "max-h-[20rem]",
                  }}
                >
                  <TableHeader>
                    {columns.map((column) => (
                      <TableColumn key={column}>{column}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {pdcs.map((pdc) => (
                      <>
                        <TableRow key={pdc.id}>
                          <TableCell className={hasLine(pdc.date)}>
                            {formatDate(pdc.date)}
                          </TableCell>
                          <TableCell className={hasLine(pdc.date)}>
                            {pdc.check}
                          </TableCell>
                          <TableCell className={hasLine(pdc.date)}>
                            {record.amount}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>

                <div className="text-end mb-3">
                  <h3 className="text-md font-bold">Total: 0</h3>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewPaymentsModal;
