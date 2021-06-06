import React, {useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

import {
    ContainerSearch
} from './styles';

import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {postRequest, getRequest} from "../../Common/RequestHelper";

export const FormPerson = () => {
    const useStyles = makeStyles({
        root: {
            fontWeight: "bold",
            fontSize: "21px",
            paddingBottom: "10px"
        },
        hidden: {
            display: "none"
        }
    })

    const [data, setData] = useState([]);
    const [result, setResult] = useState(false);
    const [groupsSelected, setGroupsSelected] = useState([]);
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const getGroups = async () => {
        setData(await getRequest("groupvaccination", null));
    }

    const getName = (e) => {
        setName(e.target.value)
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const getValue = (e) => {
        let data = groupsSelected;
        let value = e.target.value;

        if (e.target.checked) {
            data.push(parseInt(e.target.value))
        } else {
            data = data.filter(e => e !== value)
        }

        setGroupsSelected(data)
    }

    const checkboxes = []

    for (const [index, value] of data.entries()) {
        checkboxes.push(
            <FormControlLabel
                value={value.id}
                control={<Checkbox color="primary" name={"checkbox" + index} value={value.id}
                                   onChange={(e) => getValue(e)}></Checkbox>}
                label={value.description}
                labelPlacement="end"
            />)
    }

    useEffect(() => {
        getGroups();
    }, [])

    const apply = async () => {
        let rules = {
            "person": {
                "name": name,
                "email": email
            },
            "IdGroups": groupsSelected
        };

        setResult(await postRequest("form", rules));
    }

    return (
        <div>
            <ContainerSearch>
                <div className={result ? classes.hidden : ''}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={classes.root}>Selecione um ou mais grupos em que
                            você pertence:
                        </FormLabel>
                        <FormGroup aria-label="position">
                            {checkboxes}
                            <br/>
                            <TextField
                                id="nome"
                                label="Nome"
                                placeholder="Nome"
                                required={true}
                                onChange={(e) => getName(e)}
                            />
                            <br/>
                            <TextField
                                id="email"
                                label="Email"
                                placeholder="Email"
                                required={true}
                                onChange={(e) => getEmail(e)}
                            />
                            <br/><br/>
                            <Button id="buttonNewSearch" variant="contained" size="medium" onClick={() => apply()}
                                    color="primary">Cadastrar</Button>
                        </FormGroup>
                    </FormControl>
                </div>
                <div className={result ? '' : classes.hidden}>
                    <FormLabel component="legend" className={classes.root}>
                        Cadastrado com sucesso
                    </FormLabel>
                    <Button component={Link} to={'/'} id="buttonNewSearch" variant="contained" size="medium"
                            color="primary">Voltar para a pagina inicial</Button>
                </div>
            </ContainerSearch>
        </div>
    );
}
