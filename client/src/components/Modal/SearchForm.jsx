import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearAppError } from "../../state/reducers/appSlice";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import useMap from "../../state/actions/useMap";
import { UiAlertCollapse } from "../../ui/uiKit/componentsUi/UiAlert";
import { UiFlexCol } from "../../ui/uiKit/layouts/UiFlex";

const activitiesArray = [
  "Cafes",
  "Parks",
  "Restaurants",
  "Museums",
  "Start-ups",
  "Bars",
  "Malls",
  "Markets",
  "Hotels",
  "Hostels",
];

const citiesArray = [
  "Amsterdam",
  "Athens",
  "Baku",
  "Beijing",
  "Belgrade",
  "Berlin",
  "Brasília",
  "Brussels",
  "Bucharest",
  "Budapest",
  "Buenos Aires",
  "Cairo",
  "Canberra",
  "Chisinau",
  "Copenhagen",
  "Dublin",
  "Helsinki",
  "Jakarta",
  "Kiev",
  "La-plata",
  "Lisbon",
  "Ljubljana",
  "London",
  "Madrid",
  "Minsk",
  "Moscow",
  "New Delhi",
  "Nicosia",
  "Oslo",
  "Ottawa",
  "Paris",
  "Podgorica",
  "Prague",
  "Reykjavik",
  "Riga",
  "Rome",
  "Seoul",
  "Skopje",
  "Sofia",
  "Stockholm",
  "Tallinn",
  "Tel-Aviv",
  "Tirana",
  "Tokyo",
  "Vienna",
  "Vilnius",
  "Warsaw",
  "Washington D.C.",
  "Yerevan",
  "Zagreb",
];

export default function SearchForm() {
  const { loading, error } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);
  const [city, setCity] = useState("");
  const { findLocations } = useMap();
  const showAlert = error ? true : false;
  const [showActivitiesAlert, setShowActivitiesAlert] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAppError());
    if (!(activities.length > 0 && activities.length <= 4 && city !== "")) {
      console.log('not selected')
      setIsSearchDisabled(true)
      return
    } 

    const query = {
      query: {
        quantity: 5,
        location: city,
        places: activities,
      },
    };
    console.log("query:", query);
    findLocations(query);
  };

  const setAppError = (errorMsg) => {
    dispatch(setAppError(errorMsg))
  }

  const handleActivityChange = (event) => {
    setIsSearchDisabled(false) 
    const {
      target: { value },
    } = event;
    setActivities(typeof value === "string" ? value.split(",") : value);
  };

  const handleCityChange = (event) => {
    setIsSearchDisabled(false) 
    setCity(event.target.value);
  };

  // const setSearchButton = () => {

  //   (activities.length > 0 && activities.length <= 4 && city !== "") ? setIsSearchDisabled(false) : setIsSearchDisabled(true);

  // }

  useEffect(() => {
    activities.length > 4 ? setShowActivitiesAlert(true) : setShowActivitiesAlert(false);
   // setSearchButton();

  }, [activities]);

  // useEffect(() => {
  //   setSearchButton();

  // }, [city]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 3,
        width: '500px',
        //height: 300,
        maxWidth: "md",
        backgroundColor: "white",
        px: 4,
        py: 4
      }}
    >



      <h2 style={{ textAlign: 'center', margin: '0' }}>Search</h2>
      <Box >
        <FormControl fullWidth>
          <InputLabel
            id="activities">Top 5</InputLabel>
          <Select
            labelId="activities"
            id="activities"
            name="activities"
            multiple
            value={activities}
            onChange={handleActivityChange}
            input={<OutlinedInput id="activities" label="activities" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {activitiesArray.map((activitity) => (
              <MenuItem key={activitity} value={activitity}>
                {activitity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box >
      <Box sx={{ width: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="city">City</InputLabel>
          <Select
            labelId="city"
            id="city"
            value={city}
            label="city"
            onChange={handleCityChange}
          >
            {citiesArray.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >


        <Box>
          <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
          {showActivitiesAlert ? (
            <Box mb={2}>
          <UiAlertCollapse my={2} show={showActivitiesAlert} >Please choose up to four activities</UiAlertCollapse>
        </Box>
        ) : null}
          {(isSearchDisabled && !showActivitiesAlert) ? (
            <Box mb={2}>
          <UiAlertCollapse show={isSearchDisabled} >All fields must be selected</UiAlertCollapse>
          </Box>
          ) : null}
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
         
          style={{
            minWidth: "150px",
            // height: "100%",
             margin: "10px 0 0 0",
            // padding: "10px",
            alignSelf: "center",
          }}
          // disabled={isSearchDisabled}
        >
          Search
        </Button>
      </Box>

    </Box>
  );
}
