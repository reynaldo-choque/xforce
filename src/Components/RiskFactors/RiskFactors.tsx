import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";

import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

class RiskFactors extends React.Component {
    //state = {users: Array<Iuser>()}
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
        console.log(this.state.factors);
        /*
         * <List component="nav" aria-label="main mailbox folders">
         <ListItem button>
         <ListItemIcon>
         <InboxIcon />
         </ListItemIcon>
         <ListItemText primary="Inbox" />
         </ListItem>
         <ListItemText
         primary="Single-line item"
         secondary={secondary ? 'Secondary text' : null}
         />
         * */
        return (
            <React.Fragment>
                <div>Factores de Riesgo</div>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        this.state.factors.map((risk, i) =>
                            (<ListItem button>
                                <ListItemText
                                    primary={risk.name}
                                    secondary={'Nivel de Riesgo: ' + risk.seriousness}
                                />
                            </ListItem>)
                        )
                    }
                </List>
            </React.Fragment>
        );
    }
}

export default RiskFactors;