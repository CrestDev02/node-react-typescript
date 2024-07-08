import { FC, useEffect, useState } from "react";
import "./user-profile-style.css";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import {
  ICertification,
  IExperience,
  IGithubInfo,
  ISkill,
  IUser,
} from "../../types/form-data";
import { Navbar } from "../navbar/navbar";
import axios from "axios";
import { constants } from "../../utils/constants";

const token = localStorage.getItem("token");

export const DevProfile: FC = () => {
  const location = useLocation();
  const completePath = location.pathname.split("/");
  const id = completePath[completePath.length - 1];

  const [user, setUser] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    github_username: "",
    profile_pic: "",
  });
  const [experiences, setExperiences] = useState<[IExperience] | []>([]);
  const [skills, setSkills] = useState<[ISkill] | []>([]);
  const [certifications, setCertifications] = useState<[ICertification] | []>(
    []
  );
  const [gitInfo, setGitInfo] = useState<IGithubInfo>({
    login: "",
    avatar_url: "",
    html_url: "",
    repos: 0,
    followers: 0,
    following: 0,
  });
  const [tempData, setTempData] = useState<any>({ key: "", value: "" });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    axios
      .get(constants.server.url + "/user/profile/" + id, {
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

  return (
    <div className="profil-mainContainer">
      <Navbar />
      <p className="heading">Profile</p>
      <div className="subContainer">
        <div className="child-container">
          <div className="title">
            <p>General Information</p>
          </div>
          <div className="info-main">
            <div className="info-left">
              <Avatar
                src={user.profile_pic}
                sx={{ width: 100, height: 100, cursor: "pointer" }}
              />
            </div>
            <div className="info-box">
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                className="info-field"
                label="Name"
                value={user.name}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={user.email}
                className="info-field"
                label="Email"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={user.github_username}
                className="info-field"
                label="Github Username"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
        </div>
        <div className="child-container">
          <div className="title">
            <p>Experience</p>
          </div>
          <div className="experience-box">
            <Row>
              {experiences.map((exp, index) => {
                return (
                  <Col md="auto" className="experience-card" key={index}>
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
                      </ListItem>
                    );
                  })}
                </Row>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
