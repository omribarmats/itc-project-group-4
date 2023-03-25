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
  "Tel-Aviv",
  "Tokyo",
  "New Delhi",
  "Beijing",
  "Moscow",
  "Seoul",
  "Berlin",
  "Jakarta",
  "London",
  "Brasília",
  "Canberra",
  "Ottawa",
  "Washington D.C.",
  "Madrid",
  "Paris",
  "Rome",
  "Amsterdam",
  "Buenos Aires",
  "Cairo",
  "Dublin",
  "Oslo",
  "Lisbon",
  "Stockholm",
  "Athens",
  "Vienna",
  "Brussels",
  "Helsinki",
  "Prague",
  "Warsaw",
  "Budapest",
  "Copenhagen",
  "Reykjavik",
  "Nicosia",
  "Tallinn",
  "Riga",
  "Vilnius",
  "Ljubljana",
  "Zagreb",
  "Sofia",
  "Bucharest",
  "Belgrade",
  "Skopje",
  "Podgorica",
  "Tirana",
  "Chisinau",
  "Minsk",
  "Kiev",
  "Tbilisi",
  "Yerevan",
  "Baku",
];

export default function SearchForm() {
  const { loading, error } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAppError());
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type");
    const name = formData.get("name");
    console.log("type", type);
    console.log("name", name);
    console.log("formData.entries", formData.entries());
    console.log("city:", city, "activities:", activities);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    // for (let i = 0; i < form.elements.length; i++) {
    //   const element = form.elements[i];
    //   if (element.name) {
    //     formData[element.name] = element.value;
    //   }
    // }

    console.log("form submited");
  };

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
