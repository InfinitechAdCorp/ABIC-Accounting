"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { FaEye } from "react-icons/fa";

type Props = {
  url: string;
};

const ViewProofBtn = ({ url }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="View Proof"
        onPress={() => setOpen(true)}
      >
        <FaEye size={14} />
      </Button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Counter]}
        slides={[
          {
            src: url,
          },
        ]}
      />
    </>
  );
};

export default ViewProofBtn;
