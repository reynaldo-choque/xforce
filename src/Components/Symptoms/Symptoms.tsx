import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";
import {injectIntl} from 'react-intl';

import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

//CONSTANTS
import {SERIOUS_SYMPTOM, NORMAL_SYMPTOM, EMERGENCY_SYMPTOM} from "../../utils/Constants";

import "./Symptoms.css";
import ambulance from "../../images/ambulance.png";
import {Typography} from "@material-ui/core";

interface ISymtom {
    category: any,
    children: any,
    common_name: any,
    extras: any,
    id: any,
    image_source: any,
    image_url: any,
    name: any,
    parent_id: any,
    parent_relation: any,
    question: any,
    seriousness: any,
    sex_filter: any
}

class Symptoms extends React.Component <any, any> {
    state = {
        symptoms: Array<ISymtom>()
    };

    componentDidMount() {
        XforceAPI.getAllSymptoms().then(res => {
            this.setState({
                symptoms: (res && res.data) || []
            });
        });
    }

    render() {
        const {intl} = this.props;
        return (
            <React.Fragment>
                <div className={"symptom title"}>
                    <Typography variant="h6" component="h2">
                        {intl.formatMessage({id: 'symptom.title'})}
                    </Typography>
                </div>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        this.state.symptoms.map((symptom, i) =>
                            (<ListItem button className={"symptom list item"}>
                                <ListItemText
                                    primary={symptom.name}
                                    secondary={'Nivel de Riesgo: ' + intl.formatMessage({id: symptom.seriousness})}
                                    className={"symptom list item-text"}
                                />
                                {symptom.seriousness === NORMAL_SYMPTOM && (<ListItemIcon><ErrorIcon
                                    className={"symptom list item normal-symptom"}/></ListItemIcon>)}
                                {symptom.seriousness === SERIOUS_SYMPTOM && (<ListItemIcon><WarningIcon
                                    className={"symptom list item serious-symptom"}/></ListItemIcon>)}
                                {symptom.seriousness === EMERGENCY_SYMPTOM && (
                                    <img src={ambulance} className="symptom ambulance"/>)}
                                {symptom.seriousness === EMERGENCY_SYMPTOM && (
                                    <ListItemIcon><LocalHospitalIcon className={"symptom list item emergency-symptom"}/></ListItemIcon>)}
                                <Divider />
                            </ListItem>)
                        )
                    }
                </List>
            </React.Fragment>
        );
    }
}

export default injectIntl(Symptoms);