/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import TextFieldFormik from "./shared/TextFieldFormik";
import SelectFormik from "./shared/SelectFormik";

export interface DataProps {
  label: string;
  name: string;
  type: string;
  OptionEnum?: any;
  isDisable?: boolean;
  isMultiple?: boolean;
  fetchData?: (offset: number, limit: number) => Promise<any[]>;
  totalCount?: number;
  handleClick?: (id: number) => void;
  nameDisplay?: any[] | null;
  keyNameDisplay?: string | null;
  show?: boolean;
}

interface RenderFormProps {
  data: DataProps;
  formik: any;
  isDisable?: boolean;
  show?: boolean;
}

const RenderForm = ({
  data,
  formik,
  isDisable = false,
  show = true,
}: RenderFormProps) => {
  const Render = (data: DataProps) => {
    switch (data.type) {
      case "text":
        return (
          <TextFieldFormik
            label={data.label}
            name={data.name}
            formik={formik}
            isDisable={isDisable}
          />
        );
      default:
        return (
          <SelectFormik
            label={data.label}
            name={data.name}
            formik={formik}
            OptionEnum={data.OptionEnum!}
            isDisable={isDisable}
            isMultiple={data.isMultiple!}
            totalCount={data.totalCount!}
            handleClick={data.handleClick!}
            nameDisplay={data.nameDisplay!}
            keyNameDisplay={data.keyNameDisplay!}
            fetchData={data.fetchData!}
          />
        );
    }
  };

  return show && Render(data);
};

export default RenderForm;
