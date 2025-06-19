/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { client, Endpoint } from "@api";
import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";
import Text from "./Text";

interface PropsInputEditor {
  formik: any;
  label: string;
  name: string;
  isDisable?: boolean;
  readonly?: boolean;
}

// Quill import only run client
const QuillEditor = dynamic(() => import("./Editor"), {
  ssr: false, // needed to avoid error document/Quill
});

const InputEditor = ({
  formik,
  label,
  name,
  isDisable = false,
  readonly = false,
}: PropsInputEditor) => {
  const quillRef = useRef<any>(null);
  const [defaultValue, setDefaultValue] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      const Delta = Quill.import("delta");

      const value = formik.values[name];
      if (!value) {
        setDefaultValue(new Delta().insert("\n"));
      } else {
        const temp = document.createElement("div");
        temp.innerHTML = value;
        const quill = new Quill(document.createElement("div"));
        quill.root.innerHTML = temp.innerHTML;
        setDefaultValue(quill.getContents());
      }
    });
  }, [formik.values, name]);

  const handleTextChange = (_delta: any, _oldDelta: any, source: string) => {
    if (source === "user" && quillRef.current) {
      const html = quillRef.current.root.innerHTML;
      formik.setFieldValue(name, html);
    }
  };

  const handleImagePaste = async (file: File, quill: any) => {
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
        imgTags.forEach((img: HTMLImageElement) => {
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
      {defaultValue && (
        <QuillEditor
          ref={quillRef}
          readOnly={readonly || isDisable}
          defaultValue={defaultValue}
          onTextChange={handleTextChange}
          onImagePaste={handleImagePaste}
        />
      )}
    </Stack>
  );
};

export default memo(InputEditor);
