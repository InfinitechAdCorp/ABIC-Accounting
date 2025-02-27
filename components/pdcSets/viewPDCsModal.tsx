"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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

type Props = {
  record: PDCSet;
};

const ViewPDCsModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
                  <h3 className="text-sm font-semibold">Pay to: {record.pay_to}</h3>
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
                    {record.pdcs!.map((pdc) => (
                      <TableRow key={pdc.id}>
                        <TableCell>{formatDate(pdc.date)}</TableCell>
                        <TableCell>{pdc.check}</TableCell>
                        <TableCell>{record.amount}</TableCell>
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
