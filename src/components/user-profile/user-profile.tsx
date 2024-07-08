import { FC, SyntheticEvent, useEffect, useState } from "react";
import "./user-profile-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  ExperienceModelProps,
  ICertification,
  IExperience,
  IGithubInfo,
  ISkill,
  IUser,
  SkillModelProps,
} from "../../types/form-data";
import { Navbar } from "../navbar/navbar";
import axios from "axios";
import { constants } from "../../utils/constants";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Notification } from "../common/banner";
import { AddExpModel } from "../../modal/experience-modal";
import { SkillModel } from "../../modal/skill";
import { CertificationsModal } from "../../modal/certifications";

const token = localStorage.getItem("token");

export const Profile: FC = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  // const view = new URLSearchParams(search).get('view');
  // console.log(';;;;;;;;;',view)

  const [open, setOpen] = useState<boolean>(false);
  const [skillModelOpen, setSkillModelOpen] = useState<boolean>(false);
  const [certificationModelOpen, setCertificationModelOpen] =
    useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    github_username: "",
    profile_pic: "",
  });
  const [skillData, setSkillData] = useState<ISkill>({
    name: "",
    rating: 0,
    _id: "",
  });
  const [certificationData, setCertificationData] = useState<ICertification>({
    name: "",
    certificate: "",
    _id: "",
  });
  const [experiences, setExperiences] = useState<[IExperience] | []>([]);
  const [editExp, setEditExp] = useState<any>({});
  const [skills, setSkills] = useState<[ISkill] | []>([]);
  const [certifications, setCertifications] = useState<[ICertification] | []>(
    []
  );
  const [rawImg, setRawImg] = useState<any>();
  const [gitInfo, setGitInfo] = useState<IGithubInfo>({
    login: "",
    avatar_url: "",
    html_url: "",
    repos: 0,
    followers: 0,
    following: 0,
  });
  const [response, setResponse] = useState({
    isShow: false,
    message: "",
    status: "",
  });
  const [tempData, setTempData] = useState<any>({ key: "", value: "" });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Entenr valid email")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    github_username: yup.string().required("Github username is required"),
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

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    axios
      .get(constants.server.url + "/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setExperiences(res.data.data.experience);
          setSkills(res.data.data.skill);
          setCertifications(res.data.data.certification);
          const usr: IUser = {
            _id: res.data.data.user._id,
            name: res.data.data.user.name,
            email: res.data.data.user.email,
            github_username: res.data.data.user.github_username,
            profile_pic: res.data.data.user.profile_pic,
          };
          setUser(usr);
          getGitDetails(usr.github_username);
          reset(usr);
        }
      })
      .catch((e) => {
        console.log("===", e);
      });
  };

  const getGitDetails = (name: string) => {
    axios
      .get(constants.server.github_url + name, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "token " + constants.tokens.github,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setGitInfo({
            ...gitInfo,
            login: res.data.login,
            avatar_url: res.data.avatar_url,
            html_url: res.data.html_url,
          });
          callGitapi("repos", res.data.login);
          callGitapi("followers", res.data.login);
          callGitapi("following", res.data.login);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const callGitapi = async (type: string, name: string) => {
    await axios
      .get(constants.server.github_url + name + "/" + type, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "token " + constants.tokens.github,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTempData({ key: type, value: res.data.length });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setGitInfo({ ...gitInfo, [tempData.key]: tempData.value });
  }, [tempData]);

  const handleSkillEdit = (skillData: ISkill) => {
    setSkillData(skillData);
    setSkillModelOpen(true);
  };

  const handleSaveProfile = (data: IUser) => {
    const dataToSave: IUser = data;
    if (rawImg) {
      dataToSave.profile_pic = rawImg;
    }
    axios
      .put(constants.server.url + "/user/profile", dataToSave, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setResponse({
          isShow: true,
          message: "Details Updated  Successfully!",
          status: "success",
        });
        getUserDetails();
      })
      .catch((e) => {
        console.log("++++++", e);
      });
  };

  const handleExpEdit = (data: IExperience) => {
    // setEditExp(data)
    setOpen(true);
  };

  const handleSkillRemove = (id: string) => {
    axios
      .delete(constants.server.url + "/skill/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("====", res);
        setResponse({
          isShow: true,
          message: "Skill Deleted Successfully!",
          status: "success",
        });
        getUserDetails();
      })
      .catch((e) => {
        console.log("++++++", e);
      });
  };

  const handleCertificationRemove = (id: string) => {
    axios
      .delete(constants.server.url + "/certification/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log("====", res);
        setResponse({
          isShow: true,
          message: "Certification Deleted Successfully!",
          status: "success",
        });
        getUserDetails();
      })
      .catch((e) => {
        console.log("++++++", e);
      });
  };

  const handleExpDelete = (id: string) => {
    axios
      .delete(constants.server.url + "/experience/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("====", res);
        setResponse({
          isShow: true,
          message: "Experience Deleted Successfully!",
          status: "success",
        });
        getUserDetails();
      })
      .catch((e) => {
        console.log("++++++", e);
      });
  };

  const handleProfilePicUpload = () => {
    const input: HTMLElement | null =
      document.getElementById("profile_pic_input");
    input?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      setRawImg(e.target.files[0]);
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        setUser({ ...user, profile_pic: e.target?.result as string });
      };
    }
  };

  return (
    <div className="profil-mainContainer">
      <Navbar />
      <p className="heading">Profile</p>
      <div className="subContainer">
        <div className="child-container">
          <form onSubmit={handleSubmit(handleSaveProfile)}>
            <div className="title">
              <p>General Information</p>
              <button type="submit" className="action-btn">
                Save Details
              </button>
            </div>
            <div className="info-main">
              <div className="info-left">
                <TextField
                  label="profle_pic"
                  id="profile_pic_input"
                  type="file"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFileUpload(e);
                  }}
                />
                <Avatar
                  src={user.profile_pic}
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                  onClick={() => {
                    handleProfilePicUpload();
                  }}
                />
                <p className="git-name">Name Name</p>
              </div>
              <div className="info-box">
                <TextField
                  className="info-field"
                  label="Name"
                  {...register("name")}
                  error={errors.name ? true : false}
                  helperText={errors?.name?.message as any}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className="info-field"
                  label="Email"
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors?.email?.message as any}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  className="info-field"
                  label="Github Username"
                  {...register("github_username")}
                  error={errors.name ? true : false}
                  helperText={errors?.name?.message as any}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="child-container">
          <div className="title">
            <p>Experience</p>
            <button className="action-btn" onClick={() => setOpen(true)}>
              Add Experience
            </button>
          </div>
          <div className="experience-box">
            <Row>
              {experiences.map((exp, index) => {
                return (
                  <Col md="auto" className="experience-card" key={index}>
                    <div className="exp-action">
                      <EditOutlinedIcon
                        className="exp-edit"
                        onClick={() => handleExpEdit(exp)}
                      />
                      <DeleteForeverOutlinedIcon
                        className="exp-dlt"
                        onClick={() => handleExpDelete(exp._id)}
                      />
                    </div>
                    <Paper>
                      <p>{exp.position}</p>
                      <p>{exp.organization}</p>
                      <p>{exp.duration} Month</p>
                    </Paper>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div className="child-container">
          <div className="title">
            <p>Skills</p>
            <button
              className="action-btn"
              onClick={() => setSkillModelOpen(true)}
            >
              Add Skill
            </button>
          </div>
          <div className="skill-box">
            <List dense={false}>
              <Row>
                {skills.map((skill, index) => {
                  return (
                    <ListItem className="skill-item">
                      <ListItemText
                        primary={skill.name}
                        // secondary='Secondary text'
                      />
                      <Rating
                        name="size-large"
                        size="large"
                        value={skill.rating}
                        readOnly
                      />
                      <div className="skill-action-btn">
                        <input
                          type="button"
                          value="Edit"
                          className="btn-primary"
                          onClick={() => handleSkillEdit(skill)}
                        />
                        <input
                          type="button"
                          value="Remove"
                          className="btn-danger"
                          onClick={() => handleSkillRemove(skill._id)}
                        />
                      </div>
                    </ListItem>
                  );
                })}
              </Row>
            </List>
          </div>
        </div>
        <div className="root-container">
          <div className="child-container">
            <div className="title">
              <p>Github Details</p>
            </div>
            <div className="git-main">
              <div className="git-profile-pic">
                <Avatar
                  src={gitInfo?.avatar_url}
                  sx={{ width: 100, height: 100 }}
                />
                <p className="git-name">{gitInfo.login}</p>
              </div>
              <div className="git-info">
                <div className="git-numaric-main">
                  <div className="git-numaric-child">
                    <p>{gitInfo.repos}</p>
                    <p>Repositories</p>
                  </div>
                  <div className="git-numaric-child">
                    <p>{gitInfo.followers}</p>
                    <p>Followers</p>
                  </div>
                  <div className="git-numaric-child">
                    <p>{gitInfo.following}</p>
                    <p>Following</p>
                  </div>
                </div>
                <div className="git-action">
                  <a href={gitInfo.html_url} target="_blank">
                    View Profile
                  </a>
                  <a
                    href={
                      "https://github.com/" +
                      gitInfo.login +
                      "?tab=repositories"
                    }
                    target="_blank"
                  >
                    View Repositories
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="child-container ">
            <div className="title">
              <p>Certifications</p>
              <button
                type="submit"
                className="action-btn"
                onClick={() => setCertificationModelOpen(true)}
              >
                Add Certifications
              </button>
            </div>
            <div className="crt-box">
              <List dense={false}>
                <Row>
                  {certifications.map((certification, index) => {
                    return (
                      <ListItem className="crt-item" key={index}>
                        <ListItemText
                          primary={certification.name}
                          // secondary='Secondary text'
                        />
                        <a href={certification.certificate} target="_blank">
                          View Certificate
                        </a>
                        <DeleteForeverOutlinedIcon
                          className="crt-dlt"
                          onClick={() =>
                            handleCertificationRemove(certification._id)
                          }
                        />
                      </ListItem>
                    );
                  })}
                </Row>
              </List>
            </div>
          </div>
        </div>
      </div>
      <AddExpModel
        open={open}
        handleClose={() => setOpen(false)}
        experiences={experiences}
        setExperiences={setExperiences}
        editExp={editExp}
      />
      <SkillModel
        open={skillModelOpen}
        handleClose={() => setSkillModelOpen(false)}
        data={skillData}
        skills={skills}
        setSkills={setSkills}
      />
      <CertificationsModal
        open={certificationModelOpen}
        handleClose={() => setCertificationModelOpen(false)}
        data={certificationData}
        certifications={certifications}
        setCertifications={setCertifications}
      />
      <Notification
        open={response.isShow}
        message={response.message}
        handleClose={() =>
          setResponse({ isShow: false, message: "", status: "" })
        }
        status={response.status}
      />
    </div>
  );
};
