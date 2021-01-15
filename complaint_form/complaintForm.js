import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { default as TF } from "@material-ui/core/TextField";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";

const onSubmit = async (values) => {
  axios
    .post("PLACEHOLDER", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  //   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = (values) => {
  // window.alert(JSON.stringify(values, 0, 2));
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email) {
    errors.email = "Required";
  } else if (!re.test(values.email)) {
    errors.email = "Enter valid email address.";
  }
  if (!values.contactNumber) {
    errors.contactNumber = "Required";
  } else if (
    values.contactNumber <= 0 ||
    values.contactNumber / 1000000000 < 1
  ) {
    errors.contactNumber = "Enter valid mobile number.";
  }
  if (!values.location) {
    errors.location = "Required";
  }
  if (!values.pincode) {
    errors.pincode = "Required";
  }
  if (!values.numOfPotholes) {
    errors.numOfPotholes = "Required";
  }
  return errors;
};

// const required = (value) => (value ? undefined : "Required");
// const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
// const minValue = (min) => (value) =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
// const composeValidators = (...validators) => (value) =>
//   validators.reduce((error, validator) => error || validator(value), undefined);

export default function ComplaintForm() {
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      {/* <CssBaseline /> */}
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Potholes Complaint Form
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        You are logged in using email id : {"TEMP"}
      </Typography>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Field
                    name="email"
                    // defaultValue={"jagtapraj123@gmail.com"}
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>

                <Grid item xs={1} />

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                  />
                </Grid>

                <Grid item xs={2} />

                <Grid item xs={8}>
                  <Field
                    fullWidth
                    required
                    name="contactNumber"
                    component={TextField}
                    type="number"
                    label="Phone Number"
                  />
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={2} />

                <Grid item xs={8}>
                  <Field name="location" required>
                    {(props) => (
                      <div>
                        <TF
                          fullWidth
                          id="location"
                          label="Location of Pothole"
                          multiline
                          required
                          rows={4}
                          type="text"
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          error={props.meta.error && props.meta.modified}
                          helperText={props.meta.error}
                        />
                      </div>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={2} />

                <Grid item xs={8}>
                  <Field
                    required
                    fullWidth
                    component={TextField}
                    id="pincode"
                    type="number"
                    name="pincode"
                    label="Pincode"
                  />
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={2} />

                <Grid item xs={8}>
                  <Field
                    required
                    fullWidth
                    component={TextField}
                    id="numOfPotholes"
                    type="number"
                    name="numOfPotholes"
                    label="Number of Potholes"
                  />
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={2} />

                <Grid item xs={8}>
                  <Field name="description">
                    {(props) => (
                      <div>
                        <TF
                          fullWidth
                          id="description"
                          label="Descibe the Pothole"
                          multiline
                          rows={4}
                          type="text"
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                        />
                      </div>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={2} />
                <Grid item xs={4} />

                <Grid item style={{ marginTop: 24 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => {
                      form.reset();
                    }}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}
