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
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import {
  Collection as Record,
  CClient,
} from "@/components/collectionMonitoring/types";
import { update as validationSchema } from "@/components/collectionMonitoring/collections/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as action } from "@/components/collectionMonitoring/collections/actions";
import { Prisma } from "@prisma/client";
import {
  onPostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  record: Record;
  locations: {
    key: string;
    name: string;
  }[];
  cClients: CClient[];
};

const UpdateModal = ({ record, locations, cClients }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    c_client_name: record.c_client?.name,
    property: record.property,
    location: record.location,
    start: record.start,
    end: record.end,
    advance: record.advance,
    deposit: record.deposit,
    tenant_price: record.tenant_price,
    owner_income: record.owner_income,
    abic_income: record.abic_income,
    due: record.due,
    status: record.status,
  };

  const onSubmit = async (
    values: Prisma.CollectionCreateInput,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    action(values).then((response) => {
      setSubmitting(false);
      onPostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="Edit"
        onPress={onOpen}
      >
        <FaPenToSquare size={14} />
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Update Collection</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="c_client_name">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Autocomplete
                                allowsCustomValue
                                size="md"
                                variant="bordered"
                                label="Client"
                                labelPlacement="outside"
                                placeholder="Enter Client"
                                items={cClients}
                                onInputChange={(value: string) => {
                                  props.setFieldValue(field.name, value);
                                }}
                                onSelectionChange={(key: React.Key | null) => {
                                  props.setFieldValue(field.name, key);
                                }}
                                defaultSelectedKey={field.value}
                              >
                                {(cClient) => (
                                  <AutocompleteItem key={cClient.name}>
                                    {cClient.name}
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
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
                                items={locations}
                                defaultSelectedKeys={[field.value]}
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
                                inert={false}
                                showMonthAndYearPickers
                                size="md"
                                variant="bordered"
                                label="Start Date"
                                labelPlacement="outside"
                                value={dateToDateValue(field.value)}
                                onChange={(value) => {
                                  const date = dateValueToDate(value);
                                  props.setFieldValue(field.name, date);
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
                                inert={false}
                                showMonthAndYearPickers
                                size="md"
                                variant="bordered"
                                label="End Date"
                                labelPlacement="outside"
                                value={dateToDateValue(field.value)}
                                onChange={(value) => {
                                  const date = dateValueToDate(value);
                                  props.setFieldValue(field.name, date);
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
                              inert={false}
                              showMonthAndYearPickers
                              size="md"
                              variant="bordered"
                              label="Due Date"
                              labelPlacement="outside"
                              value={dateToDateValue(field.value)}
                              onChange={(value) => {
                                const date = dateValueToDate(value);
                                props.setFieldValue(field.name, date);
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
                        isLoading={submitting}
                      >
                        Update
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

export default UpdateModal;
