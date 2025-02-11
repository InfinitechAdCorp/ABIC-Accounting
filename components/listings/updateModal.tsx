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
} from "@heroui/react";
import { update as validationSchema } from "@/components/listings/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as action } from "@/components/listings/actions";
import { Prisma } from "@prisma/client";
import {
  onPostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";
import { Listing as Record } from "@/components/listings/types";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  record: Record;
};

const UpdateModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(record.status);

  const initialValues = {
    id: record.id,
    client: record.client,
    project: record.project,
    unit: record.unit,
    res: record.res,
    terms: record.terms,
    consultant: record.consultant,
    manager: record.manager,
    list_price: record.list_price,
    total_price: record.total_price,
    status: record.status,
    source: record.source,
    extension: record.extension,
    closed: record.closed,
    type: record.type,
  };

  const onSubmit = async (
    values: Prisma.ListingCreateInput,
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

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Update Listing</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="client">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Client Name"
                                labelPlacement="outside"
                                placeholder="Enter Client Name"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="type">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Select
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Type"
                                labelPlacement="outside"
                                placeholder="Select Type"
                                defaultSelectedKeys={[field.value]}
                              >
                                <SelectItem key="Sale">Sale</SelectItem>
                                <SelectItem key="Rent">Rent</SelectItem>
                                <SelectItem key="Other Services">
                                  Other Services
                                </SelectItem>
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

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="project">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Project"
                                labelPlacement="outside"
                                placeholder="Enter Project"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="unit">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Unit"
                                labelPlacement="outside"
                                placeholder="Enter Unit"
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
                        <Field name="res">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <DatePicker
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Date Res"
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

                        <Field name="terms">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Terms"
                                labelPlacement="outside"
                                placeholder="Enter Terms"
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
                        <Field name="consultant">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Property Consultant"
                                labelPlacement="outside"
                                placeholder="Enter Property Consultant"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="manager">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Sales Manager"
                                labelPlacement="outside"
                                placeholder="Enter Sales Manager"
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
                        <Field name="list_price">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="List Price"
                                labelPlacement="outside"
                                placeholder="Enter List Price"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="total_price">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Total Price"
                                labelPlacement="outside"
                                placeholder="Enter Total Price"
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
                        <Field name="status">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Select
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Status"
                                labelPlacement="outside"
                                placeholder="Select Status"
                                defaultSelectedKeys={[field.value]}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  const value = e.target.value;
                                  props.setFieldValue(field.name, value);
                                  setStatus(value);
                                }}
                              >
                                <SelectItem key="Closed">Closed</SelectItem>
                                <SelectItem key="Back Out">Back Out</SelectItem>
                              </Select>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="source">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Source"
                                labelPlacement="outside"
                                placeholder="Enter Source"
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

                      {status == "Closed" && (
                        <div className="grid grid-cols-2 gap-3">
                          <Field name="extension">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <DatePicker
                                  {...field}
                                  size="md"
                                  variant="bordered"
                                  label="Extension"
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

                          <Field name="closed">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <DatePicker
                                  {...field}
                                  size="md"
                                  variant="bordered"
                                  label="Closed Date"
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
                      )}
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
