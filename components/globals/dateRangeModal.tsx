"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DateRangePicker,
  useDisclosure,
} from "@heroui/react";

type Props = {
  model: string;
};

const DateRangeModal = ({ model }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="md" color="primary" title="Filter" onPress={onOpen}>
        Filter
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Filter {model}</ModalHeader>

              <ModalBody>
                <DateRangePicker
                  label="Select Date Range"
                  labelPlacement="outside"
                />
              </ModalBody>

              <ModalFooter>
                <Button color="primary" type="submit">
                  Filter
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DateRangeModal;
