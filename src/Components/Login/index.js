import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {ContainerSearch} from "./styles";
import { toast } from "react-toastify";
import {postRequest} from "../../Common/RequestHelper";
import { useHistory } from "react-router-dom";

export const Login = () => {
    let history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const getPassword = (e) => {
        setPassword(e.target.value)
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const addTokenIntoCache = (response) => {
        if (response.success) {
            toast.success("Logado com sucesso");
            sessionStorage.setItem("tokenAuthorization", response.token);
            history.push('/')
        } else {
            toast.error("Algo deu errado, verifique seu usuario e senha");
        }
    }

    const login = async () => {
        let data = {
            "email": email,
            "password": password
        };

        addTokenIntoCache(await postRequest("login", data));
    }

    return (
        <div>
            <ContainerSearch>
                <FormControl component="fieldset" fullWidth size={"medium"}>
                    <FormGroup aria-label="position">
                        <TextField
                            id="email"
                            label="E-mail"
                            type="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            rowsMax={2}
                            required={true}
                            onChange={(e) => getEmail(e)}
                        />
                        <br/>
                        <TextField
                            id="password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Senha"
                            onChange={(e) => getPassword(e)}
                        />
                        <br/><br/>
                        <Button id="buttonNewSearch" variant="contained" size="medium" onClick={() => login()}
                                color="primary">Login</Button>
                        <br/>
                    </FormGroup>
                </FormControl>
            </ContainerSearch>
        </div>
    );
}
