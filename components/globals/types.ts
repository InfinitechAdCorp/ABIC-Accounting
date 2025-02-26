import { SVGProps } from "react";
import { CalendarDate } from "@heroui/react";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type ExportAsPDF = {
  range: {
    start: CalendarDate;
    end: CalendarDate;
  };
};

export type Filter = {
  range: {
    start: CalendarDate;
    end: CalendarDate;
  };
};

export type Destroy = {
  id: string;
  otp: string;
};

export type Login = {
  username: string;
  password: string;
};

export type ActionResponse = {
  code: number;
  message: string;
  errors?: {
    [key: string]: string;
  };
  error?: any;
};

export type GetResponse = {
  code: number;
  message: string;
  record?: any;
  records?: any;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Column = {
  key: string;
  name: string;
  sortable: boolean;
};
