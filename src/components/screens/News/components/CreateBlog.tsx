"use client";

import { getStatus } from "@components/helper";
import { Button, SelectOptions, UploadImage } from "@components/shared";
import InputEditor from "@components/shared/InputEditor";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { SCREEN_PX } from "@constant";
import { StatusBlog, Tag } from "@constant/enum";
import { Stack } from "@mui/material";
import { useGallery } from "@store/media";
import { BlogCreateProps, useBlog } from "@store/new";
import { useFormik } from "formik";
import React, { memo, useEffect } from "react";

const CreateBlog = () => {
  const { createBlog, loading, isCreate, setIsCreateBlog } = useBlog();

  const { dataGallery } = useGallery();

  const initialValues: BlogCreateProps = {
    title: "",
    content: "",
    tags: [],
    status: "" as StatusBlog,
    thumbnailUrl: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    publicDate: new Date().toISOString(),
  };

  useEffect(() => {
    if (isCreate) {
      console.log("ok");
      setIsCreateBlog(false);
    }
  }, [isCreate]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      if (dataGallery) {
        values.thumbnailUrl = dataGallery.url;
      }
      createBlog(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack px={SCREEN_PX} gap={2}>
        <UploadImage ratioWidth={3} ratioHeight={2} />
        <Stack direction={"row"} gap={2}>
          <TextFieldFormik
            label="Meta Title"
            name="metaTitle"
            formik={formik}
          />
          <TextFieldFormik
            label="Meta Description"
            name="metaDescription"
            formik={formik}
          />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <TextFieldFormik label="Author" name="author" formik={formik} />
          <TextFieldFormik label="Title" name="title" formik={formik} />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <SelectFormik
            label={"Tags"}
            name={"tags"}
            formik={formik}
            OptionEnum={Tag}
          />
          <SelectFormik
            isMultiple={false}
            label="Status"
            name="status"
            formik={formik}
            OptionEnum={StatusBlog}
          />
        </Stack>
        <Stack>
          <InputEditor name="content" label="Content" formik={formik} />
        </Stack>

        <Stack direction={"row"} width={"100%"} justifyContent={"end"}>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(CreateBlog);
