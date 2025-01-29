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
import { FormattedClient } from "@/components/collectionMonitoring/types";
import { create as createSchema } from "@/components/collectionMonitoring/collections/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { create as createAction } from "@/components/collectionMonitoring/collections/actions";
import { Prisma } from "@prisma/client";
import {
  handlePostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";

type Props = {
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
};

const CreateModal = ({ clients, locations }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    client_id: "",
    property: "",
    location: "",
    start: "",
    end: "",
    advance: 0,
    deposit: 0,
    tenant_price: "",
    owner_income: "",
    abic_income: "",
    due: "",
  };

  const onSubmit = async (
    values: Prisma.ContractCreateInput,
    actions: { resetForm: () => void }
  ) => {
    createAction(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Contract
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={createSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Add Contract</ModalHeader>
                    <ModalBody>
                      <div className="grid grid-cols-2 gap-3">
                        <Field name="client_id">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Select
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Client"
                                labelPlacement="outside"
                                placeholder="Select Client"
                                items={clients}
                              >
                                {(client) => (
                                  <SelectItem key={client.id}>
                                    {client.name}
                                  </SelectItem>
                                )}
                              </Select>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="location">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Select
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Location"
                                labelPlacement="outside"
                                placeholder="Select Location"
                                items={locations.filter(
                                  (location) => location.name != "All"
                                )}
                              >
                                {(location) => (
                                  <SelectItem key={location.key}>
                                    {location.name}
                                  </SelectItem>
                                )}
                              </Select>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="property">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Input
                              {...field}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Property Details"
                              labelPlacement="outside"
                              placeholder="Enter Property Details"
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="start">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <DatePicker
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Start Date"
                                labelPlacement="outside"
                                value={dateToDateValue(field.value)}
                                onChange={(value) => {
                                  const date = dateValueToDate(value);
                                  props.setFieldValue("start", date);
                                }}
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="end">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <DatePicker
                                {...field}
                                size="md"
                                variant="bordered"
                                label="End Date"
                                labelPlacement="outside"
                                value={dateToDateValue(field.value)}
                                onChange={(value) => {
                                  const date = dateValueToDate(value);
                                  props.setFieldValue("end", date);
                                }}
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="advance">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Advance"
                                labelPlacement="outside"
                                placeholder="Enter Advance"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="deposit">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Deposit"
                                labelPlacement="outside"
                                placeholder="Enter Deposit"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="tenant_price">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Input
                              {...field}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Tenant Price"
                              labelPlacement="outside"
                              placeholder="Enter Tenant Price"
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="owner_income">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Owner Income"
                                labelPlacement="outside"
                                placeholder="Enter Owner Income"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="abic_income">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="ABIC Income"
                                labelPlacement="outside"
                                placeholder="Enter ABIC Income"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="due">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <DatePicker
                              {...field}
                              size="md"
                              variant="bordered"
                              label="Due Date"
                              labelPlacement="outside"
                              value={dateToDateValue(field.value)}
                              onChange={(value) => {
                                const date = dateValueToDate(value);
                                props.setFieldValue("due", date);
                              }}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={props.isSubmitting}
                      >
                        Save
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
