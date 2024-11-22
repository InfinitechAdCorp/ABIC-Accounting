"use client";

import React, { useState } from "react";
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
import { updateContract } from "@/components/contractMonitoring/contracts/actions";
import {
  FormattedContract,
  FormattedClient,
} from "@/components/contractMonitoring/types";
import { ActionResponse } from "@/components/globals/types";
import { parseDate } from "@internationalized/date";
import Form from "next/form";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
  contract: FormattedContract;
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
}

const EditContractModal = ({
  onSubmit,
  contract,
  clients,
  locations,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [contractData, setContractData] = useState(contract);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setContractData({ ...contractData, [name]: value });
  };

  const formatDate = (date: Date) => {
    if (date) {
      const localeDate = date.toLocaleDateString("en-CA");
      const formattedDate = parseDate(localeDate);
      return formattedDate;
    }
  };

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                action={(formData) =>
                  onSubmit(updateContract, formData, onClose)
                }
              >
                <ModalHeader>Edit Contract</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={contractData.id} name="id" />

                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="sm"
                      variant="bordered"
                      label="Client"
                      name="client_id"
                      items={clients}
                      defaultSelectedKeys={[contractData.client_id as string]}
                      onChange={(e) => handleChange(e)}
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
                      defaultSelectedKeys={[contractData.location as string]}
                      onChange={(e) => handleChange(e)}
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
                    value={contractData.property}
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <DatePicker
                      size="sm"
                      variant="bordered"
                      label="Start Date"
                      name="start"
                      defaultValue={formatDate(contractData.start)}
                    />

                    <DatePicker
                      size="sm"
                      variant="bordered"
                      label="End Date"
                      name="end"
                      defaultValue={formatDate(contractData.end)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Advance"
                      name="advance"
                      value={contractData.advance.toString()}
                      onChange={(e) => handleChange(e)}
                    />

                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Deposit"
                      name="deposit"
                      value={contractData.deposit.toString()}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <Input
                    type="number"
                    size="sm"
                    variant="bordered"
                    label="Tenant Price"
                    name="tenant_price"
                    value={contractData.tenant_price?.toString()}
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Owner Income"
                      name="owner_income"
                      value={contractData.owner_income?.toString()}
                      onChange={(e) => handleChange(e)}
                    />

                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="ABIC Income"
                      name="abic_income"
                      value={contractData.abic_income?.toString()}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <DatePicker
                    size="sm"
                    variant="bordered"
                    label="Due Date"
                    name="due_date"
                    defaultValue={formatDate(contractData.due_date)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Update
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

export default EditContractModal;
