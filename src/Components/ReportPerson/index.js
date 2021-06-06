import React, {useState, useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import {
    ContainerSearch
} from './styles';

import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {getRequest} from "../../Common/RequestHelper";

export const ReportPerson = () => {
    const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const useStyles = makeStyles((theme) => ({
        root: {
            fontWeight: "bold",
            fontSize: "21px",
            paddingBottom: "10px"
        }
    }));

    const classes = useStyles();
    const [data, setData] = useState([]);

    const getAllPersons = async () => {
        setData(await getRequest("report/all"));
    }

    const getInferiorNow = async () => {
        setData(await getRequest("report/inferiorNow"));
    }

    const getSuperiorNow = async () => {
        setData(await getRequest("report/superiorNow"));
    }

    useEffect(() => {
        getAllPersons();
    }, [])

    return (
        <div>
            <ContainerSearch>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs>
                        <Button component={Link} to={'/'}><HomeRoundedIcon style={{fontSize: 40}}/> Home</Button>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                        <Button onClick={() => getAllPersons()}>Todas</Button>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                        <Button onClick={() => getSuperiorNow()}>Pessoas nao aptas</Button>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                        <Button onClick={() => getInferiorNow()}>Pessoas aptas</Button>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.root}> Lista de Pessoas </FormLabel>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{backgroundColor: "lightgray"}}>
                            <TableRow>
                                <TableCell style={{color: "black", fontWeight: "bold"}}>Nome</TableCell>
                                <TableCell style={{color: "black", fontWeight: "bold"}}>Descricao</TableCell>
                                <TableCell style={{color: "black", fontWeight: "bold"}} align="center">Data de
                                    Liberacao</TableCell>
                                <TableCell style={{color: "black", fontWeight: "bold"}} align="center">E-mail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(new Date(row.liberationDate)).toLocaleDateString('pt-BR', DATE_OPTIONS)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.email}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContainerSearch>
        </div>
    );
}
