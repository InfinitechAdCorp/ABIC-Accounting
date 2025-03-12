"use client";

import React, { useState, useMemo } from "react";
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
import { formatDate } from "@/components/globals/utils";

type Props = {
  record: Collection;
};

const ViewPaymentsModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dates = eachMonthOfInterval({
    start: addMonths(record.start, 1),
    end: record.due,
  });
  const dueDay = new Date(record.start).getDate();

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

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(ufPayments.length / rowsPerPage);

  const payments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return ufPayments.slice(start, end);
  }, [page, ufPayments]);

  const columns = ["DATE", "STATUS"];

  const hasLine = (status: string) => {
    let result = "";
    status == "Paid" ? (result = "line-through") : (result = "");
    return result;
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="View Payments"
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
              <ModalBody className="mb-3">
                <Table
                  aria-label="Payments Table"
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
                    {payments.map((payment, index) => (
                      <>
                        <TableRow
                          key={index}
                          className={hasLine(payment.status)}
                        >
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{payment.status}</TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewPaymentsModal;
