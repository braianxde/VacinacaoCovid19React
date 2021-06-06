import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { format } from 'date-fns';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {
    ContainerSearch
} from './styles';

import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {putRequest, postRequest} from "../../Common/RequestHelper";
export const FormGroups = (props) => {
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


    let id = null;
    let dateEdit = null;
    let descriptionEdit = null;

    if(props.location.state){
        id = props.location.state.id;

        dateEdit =  format(new Date(props.location.state.liberationdate), 'yyyy-MM-dd');
        descriptionEdit =  props.location.state.description;
    }
    console.log(dateEdit);

    const classes = useStyles();
    const [description, setDescription] = useState(descriptionEdit);
    const [liberationDate, setLiberationDate] = useState(dateEdit);
    const [result, setResult] = useState("");

    const getDescription = (e) => {
        setDescription(e.target.value)
    }

    const getLiberationDate = (e) => {
        setLiberationDate(e.target.value)
    }


    const apply = async () => {
        let data = {
            "description": description,
            "liberationDate": liberationDate
        };

        if(id){
            data.id = id;
            setResult(await postRequest("groupvaccination", data));
        } else {
            setResult(await putRequest("groupvaccination", data));
        }


    }

    return (
        <div>
            <ContainerSearch>
                <div align={"left"}>
                    <Button component={Link} to={'/listGroups'}><ArrowBackRoundedIcon/> Voltar</Button>
                </div>
                <div className={result ? classes.hidden : ''}>
                    <FormControl component="fieldset" fullWidth size={"medium"}>
                        <FormLabel component="legend" className={classes.root}>Cadastro de Grupos</FormLabel>
                        <FormGroup aria-label="position">
                            <TextField
                                id="description"
                                label="Descricao"
                                placeholder="Descricao"
                                multiline
                                type="email"
                                value={description}
                                rowsMax={2}
                                required={true}
                                onChange={(e) => getDescription(e)}
                            />
                            <br/>
                            <TextField
                                id="dataLiberation"
                                type="date"
                                value={liberationDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Data de Liberacao da vacina para este grupo"
                                onChange={(e) => getLiberationDate(e)}
                            />
                            <br/><br/>
                            <Button id="buttonNewSearch" variant="contained" size="medium" onClick={() => apply()}
                                    color="primary">Cadastrar</Button>
                            <br/>
                        </FormGroup>
                    </FormControl>
                </div>
                <div className={result ? '' : classes.hidden}>
                    <FormLabel component="legend" className={classes.root}>
                        Cadastrado com sucesso
                    </FormLabel>
                </div>
            </ContainerSearch>
        </div>
    );
}
