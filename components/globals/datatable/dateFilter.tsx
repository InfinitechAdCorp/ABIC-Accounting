"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
  useDisclosure,
} from "@heroui/react";
import { dateToDateValue, dateValueToDate } from "@/components/globals/utils";
import { Formik, Form, Field, FieldProps } from "formik";
import { filter as validationSchema } from "@/components/globals/schemas";
import { Filter } from "@/components/globals/types";

type Props = {
  baseModel: string;
  initialValues: {
    start: Date | string;
    end: Date | string;
  };
  onSubmit: (values: Filter) => void;
  onReset: () => void;
};

const DateFilter = ({ baseModel, initialValues, onSubmit, onReset }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button size="md" color="primary" onPress={onOpen}>
        Filter
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  onSubmit(values);
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalHeader>Filter {baseModel}</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" type="submit">
                        Filter
                      </Button>
                      <Button
                        color="danger"
                        onPress={() => {
                          onReset();
                          onClose();
                        }}
                      >
                        Reset
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

export default DateFilter;
