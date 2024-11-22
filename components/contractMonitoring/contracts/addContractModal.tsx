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
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";

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
              <Form
                action={(formData) =>
                  handleSubmit(addContract, formData, onClose)
                }
              >
                <ModalHeader>Add Contract</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="md"
                      variant="bordered"
                      label="Client"
                      labelPlacement="outside"
                      placeholder="Select Client"
                      name="client_id"
                      items={clients}
                    >
                      {(client) => (
                        <SelectItem key={client.id}>{client.name}</SelectItem>
                      )}
                    </Select>

                    <Select
                      size="md"
                      variant="bordered"
                      label="Location"
                      labelPlacement="outside"
                      placeholder="Select Location"
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
                    size="md"
                    variant="bordered"
                    label="Property Details"
                    labelPlacement="outside"
                    placeholder="Enter Property Details"
                    name="property"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <DatePicker
                      size="md"
                      variant="bordered"
                      label="Start Date"
                      labelPlacement="outside"
                      name="start"
                    />

                    <DatePicker
                      size="md"
                      variant="bordered"
                      label="End Date"
                      labelPlacement="outside"
                      name="end"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="Advance"
                      labelPlacement="outside"
                      placeholder="Enter Advance"
                      name="advance"
                    />

                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="Deposit"
                      labelPlacement="outside"
                      placeholder="Enter Deposit"
                      name="deposit"
                    />
                  </div>

                  <Input
                    type="number"
                    size="md"
                    variant="bordered"
                    label="Tenant Price"
                    labelPlacement="outside"
                    placeholder="Enter Tenant Price"
                    name="tenant_price"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="Owner Income"
                      labelPlacement="outside"
                      placeholder="Enter Owner Income"
                      name="owner_income"
                    />

                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="ABIC Income"
                      labelPlacement="outside"
                      placeholder="Enter ABIC Income"
                      name="abic_income"
                    />
                  </div>

                  <DatePicker
                    size="md"
                    variant="bordered"
                    label="Due Date"
                    labelPlacement="outside"
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
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddContractModal;
