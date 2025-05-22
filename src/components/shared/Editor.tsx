"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
  onImagePaste?: (file: File, quill: Quill) => void;
}

const Editor = forwardRef<Quill | null, EditorProps>(
  (
    {
      readOnly = false,
      defaultValue,
      onTextChange,
      onSelectionChange,
      onImagePaste,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = document.createElement("div");
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        theme: "snow",
        readOnly,
      });

      if (ref && "current" in ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });
      editorContainer.addEventListener("paste", (e: ClipboardEvent) => {
        if (!e.clipboardData) return;
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            if (file && typeof onImagePaste === "function") {
              e.preventDefault();
              onImagePaste(file, quill);
            }
          }
        }
      });
      return () => {
        if (ref && "current" in ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref, readOnly]);

    return <div ref={containerRef} />;
  },
);

Editor.displayName = "Editor";
export default Editor;
