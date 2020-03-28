import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";

import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './EmergencyNumbers.css'
import {IconButton, ListItemSecondaryAction, ListSubheader, Typography} from "@material-ui/core";
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';

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
        XforceAPI.getEmergencyNumbers().then(res => {
            console.warn(res.data);
            this.setState({
                emergencyNumbers: (res && res.data) || []
            },
                () =>{
                console.warn('----',this.state.emergencyNumbers!.departamentos[0].numeros);
                });
        });
    }

    render() {
        return (
            <div className="wrap" >
                <div className="title">Números de Emergencia</div>
                <List className="root" subheader={<li />}>
                    {   this.state.emergencyNumbers && this.state.emergencyNumbers!.departamentos.map((dep: IDepartamento) => (
                        <li key={`section-${dep.departamento}`} className="sectionId">
                            <ul key={`ul-${dep._id}`}className="ul">
                                <ListSubheader className={"subtitle"}>{`Departamento ${dep.departamento}`}</ListSubheader>
                                {dep.numeros.map((numero:INumeros) => (
                                    <ListItem key={`item-${dep.departamento}-${numero.descripcion}`}>
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