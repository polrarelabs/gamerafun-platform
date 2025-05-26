"use client";

import { getStatus } from "@components/helper";
import { Button, SelectOptions, Text, UploadImage } from "@components/shared";
import InputEditor from "@components/shared/InputEditor";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { SCREEN_PX } from "@constant";
import { StatusBlog, Tag } from "@constant/enum";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useGallery } from "@store/media";
import { BlogCreateProps, BlogItem, useBlog } from "@store/new";
import { useFormik } from "formik";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

interface PropsBlog {
  type?: string;
}

const CreateBlog = ({ type = "update" }: PropsBlog) => {
  const {
    createBlog,
    loading,
    isCreate,
    setIsCreateBlog,
    blogId,
    blog,
    getBlog,
    getBlogId,
    setPageIndex,
    updateBlog,
  } = useBlog();
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const { dataGallery } = useGallery();

  useEffect(() => {
    getBlog({ pageIndex: 1, pageSize: 10 });
  }, []);

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
    if (type !== "create") {
      if (blogId && Object.keys(blogId).length > 0) {
        formik.resetForm({
          values: {
            id: blogId.id || "",
            title: blogId.title || "",
            content: blogId.content || "",
            tags: blogId.tags || [],
            status: blogId.status || ("" as StatusBlog),
            thumbnailUrl: blogId.thumbnailUrl || "",
            author: blogId.author || "",
            metaTitle: blogId.metaTitle || "",
            metaDescription: blogId.metaDescription || "",
            slug: blogId.slug || "",
            publicDate: blogId.publicDate || new Date().toISOString(),
          },
        });
        setIsDisable(false);
      } else setIsDisable(true);
    }
  }, [blogId]);

  useEffect(() => {
    if (isCreate) {
      setIsCreateBlog(false);
    }
  }, [isCreate]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (dataGallery) {
        values.thumbnailUrl = dataGallery.url;
      }
      if (type === "create") {
        createBlog(values);
      } else {
        console.log(values);

        updateBlog(values);
      }
    },
  });

  const handleClickItem = (id: string) => {
    getBlogId(id);
  };

  const [blogDisplay, setBlogDisplay] = useState<BlogItem[]>([]);
  const [blogFake, setBlogFake] = useState<BlogItem[]>([]);

  useEffect(() => {
    if (blog.pageIndex === 1) {
      setBlogDisplay(blog.items);
    } else setBlogFake(blog.items);
  }, [blog.items]);

  useEffect(() => {
    if (blogFake !== blog.items) {
      setBlogDisplay([...blogDisplay, ...blogFake]);
    }
  }, [blogFake]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (blog.pageIndex < blog.totalPages) {
            const page = blog.pageIndex + 1;
            setPageIndex(page);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [blog.items],
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack px={SCREEN_PX} gap={2}>
        <UploadImage
          ratioWidth={3}
          ratioHeight={2}
          imgUrl={
            blogId && blogId.thumbnailUrl && blogId.thumbnailUrl.length > 0
              ? blogId.thumbnailUrl
              : null
          }
        />
        {type !== "create" && (
          <Stack direction={"column"} gap={3} flex={4}>
            <Stack flex={2} gap={1}>
              <Text>Select Game</Text>
              <FormControl
                error={formik.touched.id && Boolean(formik.errors.id)}
                fullWidth
              >
                <Select
                  name="id"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={formik.values.id}
                >
                  {blogDisplay &&
                    blogDisplay.map((item, index) => {
                      const isLast = index === blogDisplay.length - 1;
                      return (
                        <MenuItem
                          ref={isLast ? lastElementRef : null}
                          value={item.id}
                          key={index}
                          onClick={() => handleClickItem(item.id)}
                        >
                          {item.title}
                        </MenuItem>
                      );
                    })}
                </Select>
                {formik.touched.id && formik.errors.id && (
                  <FormHelperText>{formik.errors.id}</FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Stack>
        )}
        <Stack direction={"row"} gap={2}>
          <TextFieldFormik
            label="Meta Title"
            name="metaTitle"
            formik={formik}
            isDisable={isDisable}
          />
          <TextFieldFormik
            label="Meta Description"
            name="metaDescription"
            formik={formik}
            isDisable={isDisable}
          />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <TextFieldFormik
            label="Author"
            name="author"
            formik={formik}
            isDisable={isDisable}
          />
          <TextFieldFormik
            label="Title"
            name="title"
            formik={formik}
            isDisable={isDisable}
          />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <SelectFormik
            label={"Tags"}
            name={"tags"}
            formik={formik}
            OptionEnum={Tag}
            isDisable={isDisable}
          />
          <SelectFormik
            isMultiple={false}
            label="Status"
            name="status"
            formik={formik}
            OptionEnum={StatusBlog}
            isDisable={isDisable}
          />
        </Stack>
        <Stack>
          <InputEditor
            name="content"
            label="Content"
            formik={formik}
            readonly={isDisable}
          />
        </Stack>

        <Stack direction={"row"} width={"100%"} justifyContent={"end"}>
          <Button type="submit" loading={loading} variant="outlined">
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(CreateBlog);
