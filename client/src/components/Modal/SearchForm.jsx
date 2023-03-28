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
import { useState } from "react";
import useMap from "../../state/actions/useMap";
import { UiAlertCollapse } from "../../ui/uiKit/componentsUi/UiAlert";

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
  const showAlert = error ? true : false


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAppError());

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
    const {
      target: { value },
    } = event;
    setActivities(typeof value === "string" ? value.split(",") : value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 500,
        height: 300,
        maxWidth: "md",
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <h2>Search</h2>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="activities">Top 5</InputLabel>
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
      <Box sx={{ m: 1, maxWidth: 300 }}>
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
      <Box>
      <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>

      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        style={{
          minWidth: "50px",
          // height: "100%",
          margin: "20px",
          padding: "10px",
          alignSelf: "center",
        }}
      >
        Search
      </Button>
    </Box>
  );
}
