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
import { dateToDateValue, dateValueToDate } from "@/components/globals/utils";
import { handlePostSubmit } from "@/components/globals/utils";

type Props = {
  contract: FormattedContract;
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
};

const UpdateModal = ({ contract, clients, locations }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (
    values: Prisma.ContractCreateInput,
    actions: { resetForm: () => void }
  ) => {
    updateAction(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
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
                    <div>
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
                      {errors.client_id && touched.client_id && (
                        <small className="text-red-500">
                          {errors.client_id}
                        </small>
                      )}
                    </div>

                    <div>
                      <Select
                        size="md"
                        variant="bordered"
                        label="Location"
                        labelPlacement="outside"
                        placeholder="Select Location"
                        name="location"
                        items={locations.filter(
                          (location) => location.name != "All"
                        )}
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

                      {errors.location && touched.location && (
                        <small className="text-red-500">
                          {errors.location}
                        </small>
                      )}
                    </div>
                  </div>

                  <div>
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
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <DatePicker
                        size="md"
                        variant="bordered"
                        label="Start Date"
                        labelPlacement="outside"
                        name="start"
                        defaultValue={dateToDateValue(values.start)}
                        onChange={(value) => {
                          const date = dateValueToDate(value);
                          setFieldValue("start", date);
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.start && touched.start && (
                        <small className="text-red-500">
                          {errors.start as string}
                        </small>
                      )}
                    </div>

                    <div>
                      <DatePicker
                        size="md"
                        variant="bordered"
                        label="End Date"
                        labelPlacement="outside"
                        name="end"
                        defaultValue={dateToDateValue(values.end)}
                        onChange={(value) => {
                          const date = dateValueToDate(value);
                          setFieldValue("end", date);
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.end && touched.end && (
                        <small className="text-red-500">
                          {errors.end as string}
                        </small>
                      )}
                    </div>
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

                  <div>
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
                  </div>

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

                  <div>
                    <DatePicker
                      size="md"
                      variant="bordered"
                      label="Due Date"
                      labelPlacement="outside"
                      name="due"
                      defaultValue={dateToDateValue(values.due)}
                      onChange={(value) => {
                        const date = dateValueToDate(value);
                        setFieldValue("due", date);
                      }}
                      onBlur={handleBlur}
                    />

                    {errors.due && touched.due && (
                      <small className="text-red-500">{errors.due as string}</small>
                    )}
                  </div>
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
