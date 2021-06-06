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
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import {getRequest, delRequest} from "../../Common/RequestHelper";

import {
    ContainerSearch
} from './styles';

import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";

export const ListGroups = () => {
    const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};
    let history = useHistory();
    const useStyles = makeStyles((theme) => ({
        root: {
            fontWeight: "bold",
            fontSize: "21px",
            paddingBottom: "10px"
        }
    }));

    const classes = useStyles();
    const [data, setData] = useState([]);

    const getGroups = async () => {
        setData(await getRequest("groupvaccination", null));
    }

    const deleteRow = async (id) => {
        let result = await delRequest("groupvaccination", id);
        if(result.success === false){
            toast.error("Token de sessao invalido por favor relogue novamente");
            history.push("/login");
        }
        toast.success("Excluido com sucesso");
        window.location.reload();
    }

    useEffect(() => {
        getGroups();
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
                        <Button component={Link} to={'/formGroups'}><AddBoxRoundedIcon
                            style={{fontSize: 40}}/> Adicionar</Button>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.root}> Lista de Grupos </FormLabel>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{backgroundColor: "lightgray"}}>
                            <TableRow>
                                <TableCell style={{color: "black", fontWeight: "bold"}}>Descricao</TableCell>
                                <TableCell style={{color: "black", fontWeight: "bold"}} align="center">Data de
                                    Liberacao</TableCell>
                                <TableCell style={{color: "black", fontWeight: "bold"}} align="center">Acoes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(new Date(row.liberationdate)).toLocaleDateString('pt-BR', DATE_OPTIONS)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button component={Link} to={{
                                            pathname: "/formGroups",
                                            state: row
                                        }}><EditRoundedIcon/></Button>
                                        <Button onClick={() => deleteRow(row.id)}><DeleteForeverRoundedIcon/></Button>
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
