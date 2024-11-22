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
} from "@nextui-org/react";
import {
  FormattedClient,
} from "@/components/contractMonitoring/types";
import { ActionResponse } from "@/components/globals/types";
import { updateClient } from "./actions";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
  client: FormattedClient;
}

const EditClientModal = ({ onSubmit, client }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [clientData, setClientData] = useState(client);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setClientData({ ...clientData, [name]: value });
  };

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => onSubmit(updateClient, formData, onClose)}
              >
                <ModalHeader>Edit Account</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={clientData.id} name="id" />

                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    variant="bordered"
                    size="sm"
                    value={clientData.name}
                    onChange={(e) => handleChange(e)}
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
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditClientModal;
