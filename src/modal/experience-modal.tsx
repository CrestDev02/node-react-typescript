import { FC } from "react";
import "../components/user-profile/user-profile-style.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  ExperienceModelProps,
  IExperience,
} from "../types/form-data";
import axios from "axios";
import { constants } from "../utils/constants";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const token = localStorage.getItem("token");

export const AddExpModel: FC<ExperienceModelProps> = ({
    open,
    handleClose,
    experiences,
    setExperiences,
    editExp,
  }) => {
    const schema = yup.object().shape({
      position: yup.string().required("Position is required"),
      organization: yup.string().required("Company name is required"),
      duration: yup.number().required("Duration is required"),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<any>({
      resolver: yupResolver(schema),
    });
  
    const keys = Object.keys(editExp).length > 0 ? true : false;
  
    if (keys) reset(reset);
  
    const handleAdd = (data: IExperience) => {
      axios
        .post(constants.server.url + "/experience", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("=========", res);
          setExperiences([...experiences, res.data.data]);
          reset();
          handleClose();
        })
        .catch((e) => {
          console.log("++++", e);
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
          {keys ? "Edit" : "Add"} Experience
        </DialogTitle>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogContent>
            <TextField
              className="exp-dilog-input"
              label="Position"
              {...register("position")}
              error={errors.position ? true : false}
              helperText={errors?.position?.message as any}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              className="exp-dilog-input"
              label="Company Name"
              {...register("organization")}
              error={errors.organization ? true : false}
              helperText={errors?.organization?.message as any}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              className="exp-dilog-input"
              label="Duration"
              {...register("duration")}
              error={errors.duration ? true : false}
              helperText={errors?.duration?.message as any}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit" autoFocus>
              {keys ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };