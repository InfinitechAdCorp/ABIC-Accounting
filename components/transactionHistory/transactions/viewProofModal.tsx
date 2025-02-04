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
import { FaEye } from "react-icons/fa";
import Image from "next/image";

type Props = {
  url: string;
};

const ViewProofModal = ({ url }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="View Proof"
        onPress={onOpen}
      >
        <FaEye />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Proof of Transaction</ModalHeader>
              <ModalBody>
                <div className="flex justify-center">
                  <Image
                    width={0}
                    height={0}
                    src={url}
                    alt="Proof"
                    unoptimized
                    className="w-full"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewProofModal;
