/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import Text from "./Text";
import { Stack } from "@mui/material";
import Quill from "quill";
import Editor from "./Editor";
import { useGallery } from "@store/media";
import { client, Endpoint } from "@api";

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
  const handleTextChange = (_delta: any, _oldDelta: any, source: string) => {
    if (source === "user" && quillRef.current) {
      const content = quillRef.current.getContents();
      const html = quillRef.current.root.innerHTML;
      formik.setFieldValue(name, html);
    }
  };

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

  const handleImagePaste = async (file: File, quill: Quill) => {
    const data = new FormData();
    data.append("file", file);
    data.append("name", file.name);
    data.append("description", file.type);

    const res = await client.post(Endpoint.GALLERY, data, {
      headers: {
        "Content-Type": undefined,
      },
    });
    if (res?.data?.url) {
      const imageUrl = res.data.url;
      const range = quill.getSelection();
      const index = range ? range.index : 0;

      quill.insertEmbed(index, "image", imageUrl);

      quill.setSelection(index + 1);

      setTimeout(() => {
        const imgTags = quill.root.querySelectorAll("img");
        imgTags.forEach((img) => {
          if (!img.src || img.src.startsWith("data:")) {
            img.setAttribute("src", imageUrl);
          }
        });

        const html = quill.root.innerHTML;
        formik.setFieldValue(name, html);
      }, 100);
    }
  };
  return (
    <Stack gap={1}>
      <Text>{label}</Text>
      <Editor
        ref={quillRef}
        readOnly={readonly || isDisable}
        defaultValue={getInitialContent()}
        onTextChange={handleTextChange}
        onImagePaste={handleImagePaste}
      />
    </Stack>
  );
};

export default memo(InputEditor);
