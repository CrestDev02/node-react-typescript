import { FC, SyntheticEvent } from "react";
import "../components/user-profile/user-profile-style.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import {
  ISkill,
  SkillModelProps,
} from "../types/form-data";
import axios from "axios";
import { constants } from "../utils/constants";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const token = localStorage.getItem("token");

export const SkillModel: FC<SkillModelProps> = ({
    open,
    handleClose,
    data,
    skills,
    setSkills,
  }) => {
    let id: string;
  
    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      rating: yup.number().required("Rating is required"),
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
  
    if (data._id) {
      setValue("rating", data.rating);
      id = data._id;
    }
  
    const handleRatingChange = (
      e: SyntheticEvent<Element, Event>,
      newValue: number | null
    ) => {
      setValue("rating", newValue);
    };
  
    const handleAdd = (data: ISkill) => {
      if (id) {
        axios
          .put(constants.server.url + "/skill/" + id, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            let skillsToSet = skills.filter((s) => s._id !== id);
            setSkills([...skillsToSet, res.data.data]);
            reset();
            handleClose();
          })
          .catch((e) => {
            console.log("++++", e);
          });
      } else {
        axios
          .post(constants.server.url + "/skill", data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log("=========", res);
            setSkills([...skills, res.data.data]);
            reset();
            handleClose();
          })
          .catch((e) => {
            console.log("++++", e);
          });
      }
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
            <Rating
              name="size-large"
              size="large"
              className="mod-rating"
              defaultValue={data ? data.rating : 0}
              onChange={(event, newValue) => {
                handleRatingChange(event, newValue);
              }}
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