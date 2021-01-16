import React, { Component } from 'react';
import styles from './Complaint.module.css';
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

const Complaint = (props) => {
    var rep = (<Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                        <b> Replies: </b> {props.replies}
                    </Grid>
                </Grid>);
    const reply = props.hasreplied ? rep : null;
    return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <Paper style={{ padding: 16 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={5}>
                    <b> Complaint ID: </b> {props.id}
                </Grid>
                <Grid item xs={5}>
                    <b> Date: </b> {props.date}
                </Grid>
                <Grid item xs={3}>
                    <b> Description: </b>
                </Grid>
                <Grid item xs={7}>
                    {props.message}
                </Grid>
            </Grid>
            {reply}
        </Paper>
        </div>
        // <div className = {styles.Complaint}>
        //     <div className={styles.ComplaintFlex} >
        //         <div><b>Complaint ID:  </b> {props.id} </div>
        //         <div> <b>Date: </b>{props.date}</div>
        //     </div>
        //     <div className={styles.ComplaintFlex} >
        //         {/* <div> Date</div>
        //         <div> {props.date}</div> */}
        //     </div>
        //     <div className={styles.ComplaintFlex} >
        //     <div><b> Description:  </b>{props.message}</div>
        //         <div> <b> Status:  </b>{props.status}</div>
        //     </div>
        //     <div className={styles.ComplaintFlex} >
                
        //     </div>
        //     {reply}
        // </div>
    );
}

export default Complaint;