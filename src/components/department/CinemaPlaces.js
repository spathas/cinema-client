import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

//Image
import classicScreen from "../../images/classicScreen.jpg";
import kidsScreen from "../../images/kidsScreen.jpg";
import luxuryScreen from "../../images/luxuryScreen.jpg";
import popcornFactory from "../../images/popcornFactory.jpg";
import preroom from "../../images/preroom.jpg";
import summerScreen from "../../images/summerScreen.jpg";
import welcome from "../../images/welcome.jpg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const images = [
  { id: "Welcome", image: welcome },
  { id: "Preroom", image: preroom },
  { id: "Classic Screen", image: classicScreen },
  { id: "Kids Screen", image: kidsScreen },
  { id: "Luxury Screen", image: luxuryScreen },
  { id: "Popcorn Factory", image: popcornFactory },
  { id: "Summer Screen", image: summerScreen },
];

export default function CinemaPlaces() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList
        className={classes.imageList}
        cols={2.2}
        gap={4}
        rowHeight={500}
      >
        {images.map((image) => (
          <ImageListItem key={image.image}>
            <img src={image.image} alt={image.id} />
            <ImageListItemBar
              title={image.id.toUpperCase()}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${image.id}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
