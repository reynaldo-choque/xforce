import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";
import { injectIntl } from 'react-intl';

import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
        console.log(this.props);
        const {intl} = this.props;
        return (
            <React.Fragment>
                <div>Factores de Riesgo</div>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        this.state.symptoms.map((symtom, i) =>
                            (<ListItem button>
                                <ListItemText
                                    primary={symtom.name}
                                    secondary={'Nivel de Riesgo: ' + intl.formatMessage({id: 'factor.serious'}) }
                                />
                            </ListItem>)
                        )
                    }
                </List>
            </React.Fragment>
        );
    }
}

export default injectIntl(Symptoms);