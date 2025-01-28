import { SVGProps } from "react";

export type ActionResponse = {
  code: number;
  message: string;
  errors?: {
    [key: string]: string;
  };
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};