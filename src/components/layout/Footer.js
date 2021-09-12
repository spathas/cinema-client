import React from "react";
import { Container, Grid, Typography, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.dark,
    padding: "3.5rem",
  },
  divider: {
    background: theme.palette.divider,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid
        xl={12}
        container
        justifyContent="space-around"
        alignContent="space-around"
        spacing="3"
        direction="row"
      >
        <Grid item xl={6}>
          <Grid
            container
            justifyContent="space-even"
            alignContent="center"
            spacing="2"
            direction="column"
          >
            <Grid item xl={12}>
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                spacing="2"
                direction="column"
              >
                <Grid item xl={12}>
                  <Typography color="primary" variant="h2" align={"center"}>
                    Details
                  </Typography>
                  <Divider variant="middle" light />
                </Grid>
                <Grid item xl={12}>
                  <Typography color="primary" variant="body1" align={"center"}>
                    Telephone number: 212.54.54.544
                  </Typography>
                </Grid>
                <Grid item xl={12}>
                  <Typography color="primary" variant="body1" align={"center"}>
                    Address: Somewhere 24, Athens
                  </Typography>
                </Grid>
                <Grid item xl={12}>
                  <Typography color="primary" variant="body1" align={"center"}>
                    Postal Code: 10438
                  </Typography>
                </Grid>
                <Grid item xl={12}>
                  <Typography color="primary" variant="body2" align={"center"}>
                    icons
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xl={12}>
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              spacing="2"
              direction="column"
            >
              <Grid item xl={12}>
                <Typography color="primary" variant="body2" align={"center"}>
                  @copyright CSpathas
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing="2"
            direction="column"
          >
            <Grid item xl={12}>
              <Typography color="primary" variant="h2" align={"center"}>
                Schedule
              </Typography>
              <Divider variant="middle" light />
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Monday: 17:00 - 00:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Thirsday: 17:00 - 00:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Wednesday: 17:00 - 00:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Thuesday: 17:00 - 00:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Friday: 17:00 - 02:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Saturday: 17:00 - 02:00
              </Typography>
            </Grid>
            <Grid item xl={12}>
              <Typography color="primary" variant="body1" align={"center"}>
                Sunday: 17:00 - 00:00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
