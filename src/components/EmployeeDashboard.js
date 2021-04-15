import React, { useEffect, useState } from "react";
import {
    // TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Input,
    Grid,
    FormHelperText,
    // Modal,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
// import { base_url } from "../config";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const theStyles = makeStyles((theme) => ({
    root: {
        width: '900px',
        variant: 'contained',
        position: 'right',
        border: '3px solid #4A90E2',
        borderColor: 'gray',
        color: 'black',
        align: 'right',
        minWidth: 50,
        '& .MuiTextField-root': {
            margin: theme.spacing(4),
            width: '10ch',
        },
    },
}));

const useStyles = makeStyles({
    select: {
        minWidth: 150,
    },
    errMessage: {
        color: "red",
    },
});

const EmployeeDashboard = () => {
    const classes = useStyles();

    //Get all the enclosure names:
    const [enclosureNames, setEnclosureNames] = useState([]);
    const [species, setSpecies] = useState([]);

    const [animal, setAnimal] = useState({
        date_arrived: null,
        deceased_date: null,
        birth_day: null,
        location: "",
        animal_name: "",
    });

    const getEnclosureNames = () => {
        axios
            .get(`/enclosures`)
            .then((res) => {
                console.log(res.data);

                setEnclosureNames(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllSpecies = () => {
        axios
            .get(`/species`)
            .then((res) => {
                console.log(res.data);
                setSpecies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getEnclosureNames();
        getAllSpecies();
    }, []);

    const validate = (values) => {
        let errors = {};
        if (!values.animal_name) {
            errors.animal_name = "Required";
        }
        if (!values.location) {
            errors.location = "Required";
        }
        if (!values.date_arrived) {
            errors.date_arrived = "Required";
        }
        if (!values.birth_day) {
            errors.birth_day = "Required";
        }
        if (!values.species) {
            errors.species = "Required";
        }
        return errors;
    };
    const [values, setValues] = useState({
        investigator: '',
        checked: true,
        purchase: '',
        enclosure: '',
        animal: '',
        customer: '',
        dateFrom: '',
        dateTo: '',
    });
    const handleReport = (values) => {
        console.log("handleReport called");
        axios
            .post('/values', {
                investigator: values.investigator,
                checked: true,
                purchase: values.purchase,
                enclosure: values.ensloure,
                animal: values.animal,
                customer: values.customer,
                dateFrom: values.dateFrom,
                dateTo: values.dateTo,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);

            });

    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handlecheck = (event) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
    };

    const handleSubmit = (values) => {
        console.log("handleSubmit called");
        axios
            .post(`/animals`, {
                date_arrived: values.date_arrived,
                deceased_date: values.deceased_date,
                birth_day: values.birth_day,
                location: values.location,
                animal_name: values.animal_name,
                species: values.species,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formik = useFormik({
        initialValues: {
            date_arrived: "",
            deceased_date: null,
            birth_day: "",
            location: "",
            animal_name: "",
            species: "",
        },
        validate,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const classy = theStyles();

    return (
        <>

            <form className="form">
                <Typography>Add Animal to Zoo</Typography>
                <Grid container spacing={2} style={{ padding: "10px" }}>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                onChange={formik.handleChange}
                                name="animal_name"
                                error={formik.errors.animal_name}
                            />
                            <FormHelperText className={classes.errMessage}>
                                {formik.errors.animal_name}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="enclosureName">Enclosure Name</InputLabel>
                            <Select
                                labelId="enclosureName"
                                onChange={formik.handleChange}
                                name="location"
                                error={formik.errors.location}
                                className={classes.select}>
                                {enclosureNames.map((e, index) => (
                                    <MenuItem key={index} value={e.location_id}>
                                        {e.location_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={classes.errMessage}>
                                {formik.errors.location}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="species">Species</InputLabel>
                            <Select
                                labelId="species"
                                onChange={formik.handleChange}
                                name="species"
                                error={formik.errors.species}
                                className={classes.select}>
                                {species.map((s, index) => (
                                    <MenuItem key={index} value={s.species_id}>
                                        {s.species_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={classes.errMessage}>
                                {formik.errors.species}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="dob" shrink>
                                Date of Birth
              </InputLabel>
                            <Input
                                labelId="dob"
                                type="date"
                                onChange={formik.handleChange}
                                error={formik.errors.birth_day}
                                name="birth_day"
                            />
                            <FormHelperText className={classes.errMessage}>
                                {formik.errors.birth_day}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="dob" shrink>
                                Arrival Date
              </InputLabel>
                            <Input
                                labelId="dob"
                                type="date"
                                defaultValue={new Date().toDateString()}
                                onChange={formik.handleChange}
                                error={formik.errors.date_arrived}
                                name="date_arrived"
                            />
                            <FormHelperText className={classes.errMessage}>
                                {formik.errors.date_arrived}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={formik.handleSubmit}
                            type="submit">
                            Add Animal
            </Button>
                    </Grid>
                </Grid>
            </form>

            <div className={classy.root} noValidate autoComplete="off">
                <div>
                    <Typography style={{
                        align: 'middle',
                        fontSize: '32px',

                    }}>Report Request</Typography>
                    <Typography align="left" style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                    }}>Activity Report{'\n'}</Typography>
                </div>
                <div>
                    <FormControl spacing={2} style={{ marginBottom: '20px', width: '40%' }} className={clsx(classy.margin, classy.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Investigator</InputLabel>
                        <OutlinedInput
                            id="outline"
                            label="name"
                            value={values.investigtor}
                            onChange={handleReport('investigator')}
                            aria-describedby="outlined-weight-helper-text"
                            labelWidth={0}
                        />
                    </FormControl>

                    <FormControlLabel
                        padding="30px"
                        control={
                            <Checkbox
                                checked={values.checked}
                                onChange={handlecheck}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Include Inactive Employees or something"
                    />
                </div>

                <Typography align="left" style={{
                    fontSize: '18px',
                }}>Select atleast one item: </Typography>
                <div>
                    <FormControl style={{ marginBottom: '20px', width: '40%' }} className={clsx(classy.margin, classy.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Purchases</InputLabel>
                        <OutlinedInput
                            label="outline"
                            id="outlined-adornment-purchase"
                            value={values.product}
                            onChange={handleReport('purchase')}
                            aria-describedby="outlined-weight-helper-text"
                            labelWidth={0}
                        />
                    </FormControl>
                    <FormControl style={{ marginBottom: '20px', width: '40%' }} className={clsx(classy.margin, classy.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Enclosures</InputLabel>
                        <OutlinedInput
                            label="outline"
                            id="outlined-adornment-enclosure"
                            value={values.enclosure}
                            onChange={handleReport('enclosure')}
                            aria-describedby="outlined-weight-helper-text"
                            labelWidth={0}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl style={{ marginBottom: '20px', width: '40%' }} className={clsx(classy.margin, classy.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Animals</InputLabel>
                        <OutlinedInput
                            label="outline"
                            id="outlined-adornment-animal"
                            value={values.animal}
                            onChange={handleReport('animal')}
                            aria-describedby="outlined-weight-helper-text"
                            labelWidth={0}
                        />
                    </FormControl>
                    <FormControl style={{ marginBottom: '20px', width: '40%' }} className={clsx(classy.margin, classy.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-customer">Customers</InputLabel>
                        <OutlinedInput
                            label="outline"
                            id="outlined-adornment-customer"
                            value={values.amount}
                            onChange={handleReport('customer')}
                            aria-describedby="outlined-weight-helper-text"
                            labelWidth={0}
                        />
                    </FormControl>
                </div>
                <FormControl style={{ marginBottom: '20px', marginRight: '40px', }} >
                    <InputLabel id="Activity From" shrink>
                        Activity date from:
              </InputLabel>
                    <Input
                        labelId="activity-from"
                        type="date"
                        onChange={handleReport('activityFrom')}

                    />
                </FormControl>
                <FormControl>
                    <InputLabel id="Activity To" shrink>
                        Activity date from:
              </InputLabel>
                    <Input
                        labelId="activity-to"
                        type="date"
                        onChange={handleReport('activityTo')}

                    />
                </FormControl>

                <div>

                </div>
            </div>
        </>
    );
};

export default EmployeeDashboard;
