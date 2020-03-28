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
import {SERIOUS_RISK, NORMAL_RISK, EMERGENCY_RISK} from "../../utils/Constants";

import "./RiskFactors.css";

interface IFactor {
    category: any,
    common_name: any,
    extras: any,
    id: any,
    image_source: any,
    image_url: any,
    name: any,
    question: any,
    seriousness: any,
    sex_filter: any
}

class RiskFactors extends React.Component <any, any> {
    state = {
        factors: Array<IFactor>()
    };

    componentDidMount() {
        XforceAPI.getRiskFactors().then(res => {
            this.setState({
                factors: (res && res.data) || []
            });
        });
    }

    render() {
        const {intl} = this.props;
        return (
            <React.Fragment>
                <div className={"risk-factors title"}>{intl.formatMessage({id: 'risk.factors.title'})}</div>
                <List aria-label="factors list" className={"risk-factors list"}>
                    {
                        this.state.factors.map((risk, i) =>
                            (<ListItem button className={"risk-factors list item"}>
                                <ListItemText
                                    primary={risk.name}
                                    secondary={'Nivel de Riesgo: ' + intl.formatMessage({id: risk.seriousness})}
                                />
                                {risk.seriousness === NORMAL_RISK && (<ListItemIcon><ErrorIcon className={"risk-factors list item normal-risk"}/></ListItemIcon>)}
                                {risk.seriousness === SERIOUS_RISK && (<ListItemIcon><WarningIcon className={"risk-factors list item serious-risk"}/></ListItemIcon>)}
                                {risk.seriousness === EMERGENCY_RISK && (<ListItemIcon><LocalHospitalIcon className={"symptom list item emergency-RISK"}/></ListItemIcon>)}
                                <Divider />
                            </ListItem>)
                        )
                    }
                </List>
            </React.Fragment>
        );
    }
}

export default injectIntl(RiskFactors);