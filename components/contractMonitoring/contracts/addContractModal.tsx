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
  Input,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { addContract } from "@/components/contractMonitoring/contracts/actions";
import { FormattedClient } from "@/components/contractMonitoring/types";
import { handleSubmit } from "@/components/globals/functions";

interface Props {
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
}

const AddContractModal = ({ clients, locations }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Contract
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) =>
                  handleSubmit(addContract, formData, onClose)
                }
              >
                <ModalHeader>Add Contract</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="sm"
                      variant="bordered"
                      label="Client"
                      name="client_id"
                      items={clients}
                    >
                      {(client) => (
                        <SelectItem key={client.id}>{client.name}</SelectItem>
                      )}
                    </Select>

                    <Select
                      size="sm"
                      variant="bordered"
                      label="Location"
                      name="location"
                      items={locations.slice(1)}
                    >
                      {(location) => (
                        <SelectItem key={location.key}>
                          {location.name}
                        </SelectItem>
                      )}
                    </Select>
                  </div>

                  <Input
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Property Details"
                    name="property"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <DatePicker
                      size="sm"
                      variant="bordered"
                      label="Start Date"
                      name="start"
                    />

                    <DatePicker
                      size="sm"
                      variant="bordered"
                      label="End Date"
                      name="end"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Advance"
                      name="advance"
                    />

                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Deposit"
                      name="deposit"
                    />
                  </div>

                  <Input
                    type="number"
                    size="sm"
                    variant="bordered"
                    label="Tenant Price"
                    name="tenant_price"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Owner Income"
                      name="owner_income"
                    />

                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="ABIC Income"
                      name="abic_income"
                    />
                  </div>

                  <DatePicker
                    size="sm"
                    variant="bordered"
                    label="Due Date"
                    name="due_date"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddContractModal;
