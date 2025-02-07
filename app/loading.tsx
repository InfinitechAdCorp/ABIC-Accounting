import React from "react";
import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Spinner color="primary" />
    </div>
  );
};

export default Loading;
