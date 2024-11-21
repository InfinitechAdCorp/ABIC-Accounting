import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Header = ({ title, children }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Header;
