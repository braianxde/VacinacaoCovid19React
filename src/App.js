import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {ContainerGeral, ImgDiv} from "./Components/Login/styles";
import PrincipalImg from "./Components/Assets/imagemprincipal2.png";
import MenuIcon from '@material-ui/icons/Menu';
import {FormPerson} from './Components/FormPerson';
import {FormGroups} from './Components/FormGroups';
import {ListGroups} from './Components/ListGroups';
import {Home} from './Components/Home';
import {Login} from './Components/Login';
import {ReportPerson} from './Components/ReportPerson';
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


function App() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        MENU: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const removeCache = () => {
        sessionStorage.removeItem('tokenAuthorization');
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List hidden={sessionStorage.hasOwnProperty('tokenAuthorization')}>
                <ListItem button key="login" component={Link} to={'/login'}>
                    <ListItemIcon><AssignmentIndIcon/></ListItemIcon>
                    <ListItemText primary="Login"/>
                </ListItem>
                <ListItem button key="home" component={Link} to={'/'}>
                    <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
            </List>

            <List hidden={!sessionStorage.hasOwnProperty('tokenAuthorization')}>
                <ListItem button key="home" component={Link} to={'/'}>
                    <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button key="list" component={Link} to={'/listGroups'}>
                    <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Listagem de Grupos"/>
                </ListItem>
                <ListItem button key="list" component={Link} to={'/reportPerson'}>
                    <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Relatorio"/>
                </ListItem>
                <Divider/>
                <ListItem onClick={removeCache}  component={Link} to={'/'} button key="logout">
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="logout"/>
                </ListItem>

            </List>
        </div>
    );

    return (
        <div>
            <ToastContainer />
            <Router>
                <div>
                    {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button style={{color: "white", fontWeight: "bold", fontSize: 15}}
                                    onClick={toggleDrawer(anchor, true)}><MenuIcon/>MENU</Button>
                            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                </div>
                <ContainerGeral>
                    <ImgDiv>
                        <img width='100%' height='300px' src={PrincipalImg} alt="Covid Vacination"/>
                    </ImgDiv>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/formPerson" component={FormPerson}/>
                        <Route path="/formGroups" component={FormGroups}/>
                        <Route path="/listGroups" component={ListGroups}/>
                        <Route path="/reportPerson" component={ReportPerson}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </ContainerGeral>
            </Router>
        </div>
    )
        ;
}

export default App;
