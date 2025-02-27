"use client";

import React from "react";
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
} from "@heroui/react";
import { PDCSet } from "@/components/pdcSets/types";
import { FaEye } from "react-icons/fa";
import { formatDate } from "@/components/globals/utils";
import { differenceInDays } from "date-fns";

type Props = {
  record: PDCSet;
};

const ViewPDCsModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hasLine = (date: Date) => {
    let result = "";
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    if (date) {
      const difference = differenceInDays(date.setHours(0, 0, 0, 0), today);
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

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
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
                <Table aria-label="PDCs Table">
                  <TableHeader>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>CHECK</TableColumn>
                    <TableColumn>AMOUNT</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {(record.pdcs || []).map((pdc) => (
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
                    ))}
                  </TableBody>
                </Table>

                <div className="text-end mb-3">
                  <h3 className="text-md font-bold">
                    Total: {record.amount * (record.pdcs?.length || 0)}
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
