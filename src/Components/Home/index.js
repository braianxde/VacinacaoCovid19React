import React, {useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

import {
    ContainerSearch
} from './styles';

import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {getRequest, postRequest} from "../../Common/RequestHelper";

const DATE_OPTIONS = {year: 'numeric', month: 'long', day: 'numeric'};


export const Home = () => {
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

    const getGroups = async () => {
        setData(await getRequest("groupvaccination", null));
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
                control={<Checkbox key={"checkboxaa"+index} color="primary" name={"checkbox" + index} value={value.id}
                                   onChange={(e) => getValue(e)}></Checkbox>}
                label={value.description}
                labelPlacement="end"
            />)
    }

    const checkRules = async () => {
        let rules = {
            "idItems": groupsSelected
        };

        setResult(await postRequest("checkrules", rules));
    }

    const resetSearch = () => {
        window.location.reload();
    }

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <div>
            <ContainerSearch>
                <div className={result ? classes.hidden : ''}>
                    <FormControl component="fieldset">
                        <FormLabel id="selecione" component="legend" className={classes.root}>Selecione um ou mais grupos em que
                            você pertence:
                        </FormLabel>
                        <FormGroup aria-label="position">
                            {checkboxes}
                        </FormGroup>
                        <br/><br/>
                        <Button id="buttoSearch" onClick={() => checkRules()} variant="contained" size="medium"
                                color="primary">Verificar</Button>
                    </FormControl>
                </div>
                <div className={result ? '' : classes.hidden}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" id="msg"
                                   className={classes.root}>{result.status ? "Você poderá tomar a vacina a partir do dia " + (new Date(result.date)).toLocaleDateString('pt-BR', DATE_OPTIONS) : "Sem previsao para os grupos informados"}</FormLabel>
                    </FormControl>
                    <br/><br/><br/>
                    <Button id="buttonNewSearch" variant="contained" size="medium" onClick={() => resetSearch()}
                            color="primary">Nova Pesquisa?</Button>
                </div>
            </ContainerSearch>
            <ContainerSearch>
                <FormControl component="fieldset">
                    <FormLabel id="msgtelegram" component="legend" className={classes.root}>Para receber os updates das datas de
                        vacinacao via TELEGRAM faca seu cadastro</FormLabel>
                </FormControl>
                <br/><br/>
                <Button component={Link} to={'/formPerson'} id="buttonNewSearch" variant="contained" size="medium"
                        color="primary">Ir para o Cadastro?</Button>
                <br/>
            </ContainerSearch>
        </div>
    );
}
