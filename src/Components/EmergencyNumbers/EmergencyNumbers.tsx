import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";

import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './EmergencyNumbers.css'
import {Divider, IconButton, ListItemSecondaryAction, ListSubheader, Typography} from "@material-ui/core";
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import {EMERGENCY_NUMBERS} from "../../utils/Constants";

interface IState {
    emergencyNumbers : INumberEmergency | null
}

interface INumberEmergency {
    departamentos: IDepartamento[],
}

interface IDepartamento {
    numeros: INumeros[],
    departamento: string,
    _id: string,
    __v: number
}

interface INumeros {
    descripcion: string,
    numero: string
}

class EmergencyNumbers extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            emergencyNumbers : null
        }
    }

    componentDidMount() {
        // XforceAPI.getEmergencyNumbers().then(res => {
            this.setState({
                emergencyNumbers: EMERGENCY_NUMBERS //(res && res.data) || []
            });
        // });
    }

    render() {
        return (
            <div className="wrap" >
                <Typography variant="h6" component="h2">
                    Números de Emergencia
                </Typography>
                <List className="root">
                    {   this.state.emergencyNumbers && this.state.emergencyNumbers!.departamentos.map((dep: IDepartamento) => (
                        <li key={`section-${dep.departamento}`} className="sectionId">
                            <ul key={`ul-${dep._id}`}>
                                <ListSubheader className={"subtitle"}>{dep.departamento}</ListSubheader>
                                {dep.numeros.map((numero:INumeros) => (
                                    <ListItem key={`item-${dep.departamento}-${numero.descripcion}`} className="listItem">
                                        <ListItemText key={numero.descripcion} primary={numero.descripcion}
                                          secondary={
                                                  <Typography
                                                      component="span"
                                                      variant="body2"
                                                      className="ul"
                                                      color="textPrimary"
                                                  >{numero.numero}
                                                  </Typography>
                                          }/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" className="href">
                                                <a href={`tel:${numero.numero}` } color="primary"><PhoneEnabledIcon /></a>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </div>
        );
    }
}

export default EmergencyNumbers;