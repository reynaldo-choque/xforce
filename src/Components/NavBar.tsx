import React, { Component } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './NavBar.css'
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import ReplayIcon from '@material-ui/icons/Replay';

const style = {
    flexGrow: 1
}

class NavBar extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            left: false
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

    list = () => (
        <div
            className={"ListSidebar"}
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
        >
            <List>
                <ListItem button key="id1" onClick={()=>this.goTo('/')}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Diagnostico">
                    </ListItemText>
                </ListItem>
                <ListItem button key="id2" onClick={()=>this.goTo('/factores')}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Factores de Riesgo">
                    </ListItemText>
                </ListItem>
                <ListItem button key="id3" onClick={()=>this.goTo('/sintomas')}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Síntomas">
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem button key="id4" onClick={()=>this.goTo('/numerosEmergencia')}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Números de emergencia">
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );

    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar className="PrimaryColor TextHeader">
                        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" style={style}>
                            XForce
                        </Typography>
                        <IconButton aria-label="replay" color="inherit" onClick={this.replay} >
                            <ReplayIcon />
                        </IconButton>
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
            </div>

        );
    }
}

export default  withRouter (NavBar);
