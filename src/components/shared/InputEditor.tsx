"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import Text from "./Text";
import { Stack } from "@mui/material";
import Quill from "quill";
import Editor from "./Editor";

interface PropsInputEditor {
  formik: any;
  label: string;
  name: string;
  isDisable?: boolean;
  readonly?: boolean;
}

const Delta = Quill.import("delta");

const InputEditor = ({
  formik,
  label,
  name,
  isDisable = false,
  readonly = false,
}: PropsInputEditor) => {
  const quillRef = useRef<Quill | null>(null);

  // Sync Quill content to Formik
  const handleTextChange = (delta: any, oldDelta: any, source: string) => {
    if (source === "user" && quillRef.current) {
      const content = quillRef.current.getContents();
      const html = quillRef.current.root.innerHTML;
      formik.setFieldValue(name, html);
      console.log(html);
    }
  };

  // Initial content from Formik
  const getInitialContent = () => {
    const value = formik.values[name];
    if (!value) {
      return new Delta().insert("\n");
    }
    const temp = document.createElement("div");
    temp.innerHTML = value;
    const quill = new Quill(document.createElement("div"));
    quill.root.innerHTML = temp.innerHTML;
    return quill.getContents();
  };

  return (
    <Stack gap={1}>
      <Text>{label}</Text>
      <Editor
        ref={quillRef}
        readOnly={readonly || isDisable}
        defaultValue={getInitialContent()}
        onTextChange={handleTextChange}
      />
    </Stack>
  );
};

export default memo(InputEditor);
