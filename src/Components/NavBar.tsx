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

    onList = () => {
        this.props.history.push('/');
    };

    list = () => (
        <div
            className={"ListSidebar"}
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
                <ListItem button key="id1" onClick={this.onList}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Lista">
                    </ListItemText>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
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
