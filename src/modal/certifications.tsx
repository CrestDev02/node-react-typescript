import React, { FC } from "react";
import { CertificationModelProps, ICertification } from "../types/form-data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { constants } from "../utils/constants";

const token = localStorage.getItem("token");

export const CertificationsModal: FC<CertificationModelProps> = ({
  open,
  handleClose,
  data,
  certifications,
  setCertifications,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is reqired"),
    certificate: yup
      .mixed()
      .test("required", "You need to provide a file", (file) => {
        console.log("$$$$", file);
        return file && file.length;
        //  <-- u can use this if you don't want to allow empty files to be uploaded;
        // if (file) return true;
        // return false;
      }),
    // .test("fileSize", "The file is too large", (file) => {
    //   //if u want to allow only certain file sizes
    //   return file && file.size <= 2000000;
    // }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const handleAdd = (data: ICertification) => {
    console.log("}}}}}}}", data);
    const body = data;
    body.certificate = body.certificate[0];
    axios
      .post(constants.server.url + "/certification", body, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCertifications([...certifications, res.data.data]);
          reset();
          handleClose();
        }
      })
      .catch((e) => {
        console.log("++++++", e);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {data._id !== "" ? "Edit Skill" : "Add Skill"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleAdd)}>
        <DialogContent>
          <TextField
            className="exp-dilog-input"
            label="Skill Name"
            {...register("name")}
            defaultValue={data.name}
            error={errors.name ? true : false}
            helperText={errors?.name?.message as any}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className="exp-dilog-input"
            label="Certificate"
            {...register("certificate")}
            type="file"
            error={errors.certificate ? true : false}
            helperText={errors?.certificate?.message as any}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" autoFocus>
            {data._id === "" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
