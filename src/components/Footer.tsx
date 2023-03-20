import React from "react";
import _ from "underscore";
import {
  CardContent,
  Chip,
  Container,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";
import {
  ConstructionSharp,
  GitHub,
  OpenInNew,
  PersonSharp,
} from "@mui/icons-material";

import { ReactComponent as LogoDockerIcon } from "../icons/logo-docker.svg";
import { ReactComponent as LogoPythonIcon } from "../icons/logo-python.svg";
import { ReactComponent as LogoReactIcon } from "../icons/logo-react.svg";
import { ReactComponent as LogoGoogleIcon } from "../icons/logo-google.svg";
import { ReactComponent as LogoTistoryIcon } from "../icons/logo-tistory.svg";
import { BottomBox, FlexBox, InfoCard, InfoLabel } from "./styles";

const githubID: string = "magae1";
const gmail: string = "jjilil8351@gmail.com";

const DevInfos = [
  {
    label: githubID,
    icon: <GitHub />,
    anchor: () => window.open(`https://github.com/${githubID}`, "_blank"),
  },
  {
    label: "magae's DB",
    icon: <SvgIcon component={LogoTistoryIcon} inheritViewBox />,
    anchor: () => window.open("https://magae5basement.tistory.com/", "_blank"),
  },
];

const logos = [
  {
    name: "Docker",
    icon: <SvgIcon component={LogoDockerIcon} inheritViewBox />,
  },
  {
    name: "Python",
    icon: <SvgIcon component={LogoPythonIcon} inheritViewBox />,
  },
  {
    name: "React",
    icon: <SvgIcon component={LogoReactIcon} inheritViewBox />,
  },
];

const Footer = () => {
  return (
    <BottomBox>
      <Container maxWidth={"lg"}>
        <Grid container spacing={1} py={{ xs: 1, sm: 3 }}>
          <Grid item xs={12} sm={12} md={6}>
            <InfoCard>
              <CardContent>
                <Typography variant={"h5"}>인급동 히스토리</Typography>
                <Typography variant={"caption"}>
                  유튜브 인기 급상승 동영상을 기록하는 사이트입니다.{" "}
                  <Link href={"/admin"}>관리자 페이지</Link>
                </Typography>
              </CardContent>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <InfoLabel>
                  <PersonSharp sx={{ mr: 0.5, verticalAlign: "middle" }} />
                  Developer
                </InfoLabel>
                <FlexBox>
                  {DevInfos.map((value) => (
                    <Chip
                      key={_.uniqueId("dev-infos")}
                      avatar={value.icon}
                      label={value.label}
                      deleteIcon={<OpenInNew />}
                      onDelete={value.anchor}
                      size={"small"}
                    />
                  ))}
                  <Chip
                    avatar={
                      <SvgIcon component={LogoGoogleIcon} inheritViewBox />
                    }
                    label={gmail}
                    size={"small"}
                  />
                </FlexBox>
              </CardContent>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <InfoLabel>
                  <ConstructionSharp
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />
                  Dev-Tools
                </InfoLabel>
                <FlexBox>
                  {logos.map(({ name, icon }) => {
                    return (
                      <Chip
                        key={_.uniqueId("dev-tools")}
                        label={name}
                        avatar={icon}
                        size={"small"}
                      />
                    );
                  })}
                </FlexBox>
              </CardContent>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
    </BottomBox>
  );
};

export default Footer;
