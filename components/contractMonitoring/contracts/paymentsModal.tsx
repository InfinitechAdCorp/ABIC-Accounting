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
} from "@nextui-org/react";
import { MdPayments } from "react-icons/md";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

const PaymentsModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const records = [
    {
      key: "1",
      month: "JANUARY",
      status: "PAID",
    },
    {
      key: "2",
      month: "FEBRUARY",
      status: "PAID",
    },
    {
      key: "3",
      month: "MARCH",
      status: "PAID",
    },
    {
      key: "4",
      month: "APRIL",
      status: "",
    },
    {
      key: "5",
      month: "MAY",
      status: "",
    },
    {
      key: "6",
      month: "JUNE",
      status: "",
    },
    {
      key: "7",
      month: "JULY",
      status: "",
    },
    {
      key: "8",
      month: "AUGUST",
      status: "",
    },
    {
      key: "9",
      month: "SEPTEMBER",
      status: "",
    },
    {
      key: "10",
      month: "OCTOBER",
      status: "",
    },
    {
      key: "11",
      month: "NOVEMBER",
      status: "",
    },
    {
      key: "12",
      month: "DECEMBER",
      status: "",
    },
  ];

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(records.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return records.slice(start, end);
  }, [page, records]);

  return (
    <>
      <Button
        className="text-white"
        size="sm"
        color="success"
        isIconOnly={true}
        title="Manage Payments"
        onPress={onOpen}
      >
        <MdPayments size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Payments</ModalHeader>
              <ModalBody>
                <Table
                  isCompact
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: "min-h-[250px]",
                  }}
                >
                  <TableHeader>
                    <TableColumn key="month">MONTH</TableColumn>
                    <TableColumn key="status">STATUS</TableColumn>
                  </TableHeader>
                  <TableBody items={items}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentsModal;
