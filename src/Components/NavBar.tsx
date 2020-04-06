import React, { Component } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './NavBar.css'
import {
    AppBar,
    Avatar, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import ReplayIcon from '@material-ui/icons/Replay';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TocIcon from '@material-ui/icons/Toc';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BoliviaUnida from "../images/BoliviaUnida.png";
import PhoneIcon from '@material-ui/icons/Phone';

class NavBar extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            left: false,
            showMessage: false
        }
    }

    toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        this.setState({left: open});
    };

    replay = () => {
        window.location.reload();
    };

    goTo = (screen: string) => {
        this.props.history.push(screen);
    };

    showQuedateEnCasa = (show: boolean) => {
        this.setState({
            showMessage: show
        });
    }
    list = () => (
        <div
            className={"ListSidebar"}
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
        >
            <List>
                <ListItem button key="id1" onClick={()=>this.goTo('/')}>
                    <ListItemIcon><AssignmentIcon/></ListItemIcon>
                    <ListItemText primary="Diagnóstico">
                    </ListItemText>
                </ListItem>
                <ListItem button key="id2" onClick={()=>this.goTo('/factores')}>
                    <ListItemIcon><TocIcon/></ListItemIcon>
                    <ListItemText primary="Factores de Riesgo">
                    </ListItemText>
                </ListItem>
                <ListItem button key="id3" onClick={()=>this.goTo('/sintomas')}>
                    <ListItemIcon><AcUnitIcon/></ListItemIcon>
                    <ListItemText primary="Síntomas">
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem button key="id4" onClick={()=>this.goTo('/numerosEmergencia')}>
                    <ListItemIcon><PhoneIcon/></ListItemIcon>
                    <ListItemText primary="Números de emergencia">
                    </ListItemText>
                </ListItem>
                <ListItem button key="id5" onClick={()=>this.goTo('/estadisticas')}>
                    <ListItemIcon><PhoneIcon/></ListItemIcon>
                    <ListItemText primary="Estadísticas en Bolivia">
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );

    render() {
        const { showMessage } = this.state;
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar className="PrimaryColor TextHeader">
                        <IconButton edge="start" color="inherit" onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="subtitle1" className="titleNav">
                            Test Covid19<br/>
                            <Typography variant="caption" className="subtitleNav">
                                Coranavirus
                            </Typography>
                        </Typography><br/>
                        <IconButton color="inherit" onClick={this.replay} >
                            <ReplayIcon />
                        </IconButton>
                        <Avatar alt="BoliviaUnida" src={BoliviaUnida} className="nuestraBandera"
                            onClick={()=>this.showQuedateEnCasa(true)}/>
                    </Toolbar>
                </AppBar>
                <div className="SpaceBottom"></div>
                <React.Fragment key="menuSideBar">
                    <SwipeableDrawer
                        open={this.state.left}
                        onClose={this.toggleDrawer(false)}
                        onOpen={this.toggleDrawer(true)}
                    >
                        {this.list()}
                    </SwipeableDrawer>
                </React.Fragment>
                <Dialog
                    open={showMessage}
                    onClose={()=>this.showQuedateEnCasa(false)}
                >
                    <DialogTitle id="alert-dialog-title" className="dialog">{"#QuedateEnCasa"}</DialogTitle>
                    <DialogContent className="dialog">
                        {"Cuidemos a los nuestros"}
                        <DialogContentText id="alert-dialog-description">
                            <span className="rojo">{"La Unión "}</span>
                            <span className="amarillo">{"es la "}</span>
                            <span className="verde">{"Fuerza"}</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.showQuedateEnCasa(false)} color="primary">
                            Me quedo en casa
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default  withRouter (NavBar);
