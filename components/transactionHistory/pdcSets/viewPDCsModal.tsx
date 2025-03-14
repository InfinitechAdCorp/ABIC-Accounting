"use client";

import React, { useState, useMemo } from "react";
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
import { PDCSet } from "@/components/transactionHistory/pdcSets/types";
import { FaEye } from "react-icons/fa";
import { formatDate, formatNumber } from "@/components/globals/utils";
import { differenceInDays } from "date-fns";

type Props = {
  record: PDCSet;
};

const ViewPDCsModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ufPdcs = record.pdcs || [];

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(ufPdcs.length / rowsPerPage);

  const pdcs = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ufPdcs.slice(start, end);
  }, [page, ufPdcs]);

  const columns = ["DATE", "CHECK NO.", "AMOUNT"];

  const hasLine = (date: Date) => {
    let result = "";
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    if (date) {
      const difference = differenceInDays(date.setUTCHours(0, 0, 0, 0), today);
      difference <= 0 ? (result = "line-through") : (result = "");
    }
    return result;
  };

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

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="py-3">
                <div>
                  <h3 className="text-md font-bold">{record.name}</h3>
                  <h3 className="text-sm font-semibold">
                    Pay to: {record.pay_to}
                  </h3>
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
                        <TableRow key={pdc.id} className={hasLine(pdc.date)}>
                          <TableCell>{formatDate(pdc.date)}</TableCell>
                          <TableCell>{pdc.check_number}</TableCell>
                          <TableCell>{record.amount}</TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>

                <div className="text-end mb-3">
                  <h3 className="text-md font-bold">
                    Total: {formatNumber(record.amount * ufPdcs.length)}
                  </h3>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewPDCsModal;
