import TabPanel from "../TabPanel/TabPanel";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {MovieTab,MovieTabs} from "./ScrollableTabsButtonStyle"

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
    }
  }));
  
const  ScrollableTabsButtonAuto = ({Trailer,Casts,Crew,Comments,Ratings,Others}) =>{
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <MovieTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <MovieTab label="Trailer" {...a11yProps(1)} />
            <MovieTab label="Casts" {...a11yProps(1)} />
            <MovieTab label="Crew" {...a11yProps(2)} />
            <MovieTab label="Comments" {...a11yProps(3)} />
            <MovieTab label="Others" {...a11yProps(4)} />
          </MovieTabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {Trailer}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {Casts}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {Crew}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {Comments}
        </TabPanel>
        <TabPanel value={value} index={4}>
          Others
        </TabPanel>
      </div>
    );
  }

  export default ScrollableTabsButtonAuto;