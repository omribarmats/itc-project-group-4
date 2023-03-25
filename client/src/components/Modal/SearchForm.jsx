import { Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { clearAppError } from "../../state/reducers/appSlice";


export default function SearchForm() {

  const {loading, error} = useSelector(state => state.app)
  const dispatch = useDispatch()
 
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearAppError())
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type');
    const name = formData.get('name')
    console.log('type', type)
    console.log('name', name)
    console.log('formData.entries' ,formData.entries())

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    
    // for (let i = 0; i < form.elements.length; i++) {
    //   const element = form.elements[i];
    //   if (element.name) {
    //     formData[element.name] = element.value;
    //   }
    // }



    console.log('form submited')
  
  }


  const activities = [
    { title: "Cafes" },
    { title: "Parks" },
    { title: "Restaurants" },
    { title: "Museums" },
    { title: "Start-ups" },
    { title: "Bars" },
    { title: "Malls" },
    { title: "Markets" },
    { title: "Hotels" },
    { title: "Hostels" },
  ];

  const cities = [
    { title: "Tokyo" },
    { title: "New Delhi" },
    { title: "Beijing" },
    { title: "Moscow" },
    { title: "Seoul" },
    { title: "Berlin" },
    { title: "Jakarta" },
    { title: "London" },
    { title: "Brasília" },
    { title: "Canberra" },
    { title: "Ottawa" },
    { title: "Washington D.C." },
    { title: "Madrid" },
    { title: "Paris" },
    { title: "Rome" },
    { title: "Amsterdam" },
    { title: "Buenos Aires" },
    { title: "Cairo" },
    { title: "Dublin" },
    { title: "Oslo" },
    { title: "Lisbon" },
    { title: "Stockholm" },
    { title: "Athens" },
    { title: "Vienna" },
    { title: "Brussels" },
    { title: "Helsinki" },
    { title: "Prague" },
    { title: "Warsaw" },
    { title: "Budapest" },
    { title: "Copenhagen" },
    { title: "Reykjavik" },
    { title: "Nicosia" },
    { title: "Tallinn" },
    { title: "Riga" },
    { title: "Vilnius" },
    { title: "Ljubljana" },
    { title: "Zagreb" },
    { title: "Sofia" },
    { title: "Bucharest" },
    { title: "Belgrade" },
    { title: "Skopje" },
    { title: "Podgorica" },
    { title: "Tirana" },
    { title: "Chisinau" },
    { title: "Minsk" },
    { title: "Kiev" },
    { title: "Tbilisi" },
    { title: "Yerevan" },
    { title: "Baku" },
  ];

  const filter = createFilterOptions();
  const [value, setValue] = useState(null);

  return (
    <Box component='form' onSubmit={handleSubmit} 
      sx={{
        width: 500,
        height: 300,
        maxWidth: "md",
        backgroundColor: "primary.white",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <h2>Search</h2>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={activities}
          name='type'
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          size="small"
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Top 5" placeholder="Activities" />
          )}
        />

        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.title
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="City"
          name='location'
          options={cities}
          size="small"
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(props, option) => <li {...props}>{option.title}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => <TextField {...params} label="In" />}
        />

        <Button
          type='submit'
          variant="contained"
          size="large"
          style={{
            minWidth: "50px",
            height: "100%",
            margin: "20px",
            padding: "10px",
            alignSelf: "center",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
