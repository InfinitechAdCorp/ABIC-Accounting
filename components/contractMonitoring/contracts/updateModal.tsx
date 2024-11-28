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
import {
  FormattedContract,
  FormattedClient,
} from "@/components/contractMonitoring/types";
import { update as updateSchema } from "@/components/contractMonitoring/contracts/schemas";
import { useFormik } from "formik";
import { update as updateAction } from "@/components/contractMonitoring/contracts/actions";
import { Prisma } from "@prisma/client";
import { parseDate } from "@internationalized/date";

interface Props {
  contract: FormattedContract;
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
}

const UpdateModal = ({ contract, clients, locations }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (values: Prisma.ContractCreateInput) => {
    console.log(values);
    // updateAction(values);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      id: contract.id,
      client_id: contract.client_id,
      property: contract.property,
      location: contract.location,
      start: contract.start,
      end: contract.end,
      advance: contract.advance,
      deposit: contract.deposit,
      tenant_price: contract.tenant_price,
      owner_income: contract.owner_income,
      abic_income: contract.abic_income,
      due: contract.due,
    },
    validationSchema: updateSchema,
    onSubmit,
    enableReinitialize: true,
  });

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
              <form onSubmit={handleSubmit}>
                <ModalHeader>Edit Contract</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={values.id} name="id" />

                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="md"
                      variant="bordered"
                      label="Client"
                      labelPlacement="outside"
                      placeholder="Select Client"
                      name="client_id"
                      items={clients}
                      defaultSelectedKeys={[values.client_id as string]}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      defaultSelectedKeys={[values.location]}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    value={values.property}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.property && touched.property && (
                    <small className="text-red-500">{errors.property}</small>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <DatePicker
                      size="md"
                      variant="bordered"
                      label="Start Date"
                      labelPlacement="outside"
                      name="start"
                      defaultValue={formatDate(values.start)}
                    />

                    <DatePicker
                      size="md"
                      variant="bordered"
                      label="End Date"
                      labelPlacement="outside"
                      name="end"
                      defaultValue={formatDate(values.end)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Advance"
                        labelPlacement="outside"
                        placeholder="Enter Advance"
                        name="advance"
                        value={values.advance.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.advance && touched.advance && (
                        <small className="text-red-500">{errors.advance}</small>
                      )}
                    </div>

                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Deposit"
                        labelPlacement="outside"
                        placeholder="Enter Deposit"
                        name="deposit"
                        value={values.deposit.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.deposit && touched.deposit && (
                        <small className="text-red-500">{errors.deposit}</small>
                      )}
                    </div>
                  </div>

                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    label="Tenant Price"
                    labelPlacement="outside"
                    placeholder="Enter Tenant Price"
                    name="tenant_price"
                    value={values.tenant_price?.toString()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.tenant_price && touched.tenant_price && (
                    <small className="text-red-500">
                      {errors.tenant_price}
                    </small>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Owner Income"
                        labelPlacement="outside"
                        placeholder="Enter Owner Income"
                        name="owner_income"
                        value={values.owner_income?.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.owner_income && touched.owner_income && (
                        <small className="text-red-500">
                          {errors.owner_income}
                        </small>
                      )}
                    </div>

                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="ABIC Income"
                        labelPlacement="outside"
                        placeholder="Enter ABIC Income"
                        name="abic_income"
                        value={values.abic_income?.toString()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.abic_income && touched.abic_income && (
                        <small className="text-red-500">
                          {errors.abic_income}
                        </small>
                      )}
                    </div>
                  </div>

                  <DatePicker
                    size="md"
                    variant="bordered"
                    label="Due Date"
                    labelPlacement="outside"
                    name="due"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
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

export default UpdateModal;
