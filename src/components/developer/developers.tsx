import { FC, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IUser } from "../../types/form-data";
import { Navbar } from "../navbar/navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./developers-style.css";
import axios from "axios";
import { constants } from "../../utils/constants";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

export const Developers: FC = () => {
  const [devs, setDevs] = useState<[IUser] | []>([]);

  useEffect(() => {
    getDevs();
  }, []);

  const getDevs = () => {
    axios
      .get(constants.server.url + "/user/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setDevs(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="dev-container">
      <Navbar />
      <p className="heading">Developers</p>
      <div className="subContainer">
        <Row className="d-flex">
          {devs.map((dev, index) => {
            return (
              <Col md="auto" className="dev-card" key={index}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={dev.profile_pic}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {dev.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dev.email}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={"/profile/" + dev._id} color="primary">
                      View Profile
                    </Link>
                    <Link to={"/message/" + dev._id} color="primary">
                      Message
                    </Link>
                  </CardActions>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
