import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import XforceAPI from "../Services/XforceAPI";

class ListComponent extends Component <any, any>{

    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        XforceAPI.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(userId: string) {
        XforceAPI.deleteUser(userId)
            .then(res => {
                this.setState({message : 'User deleted successfully.'});
                // this.setState({users: this.state.users.filter(user => user.id !== userId)});
            })
    }

    editUser(id: string) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Lista de laboratorios</Typography>
                <Button variant="contained"  onClick={() => this.addUser()}>
                    Agregar laboratorio
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Bloque</TableCell>
                            <TableCell align="right">Encargado</TableCell>
                            <TableCell align="right">Horas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{this.state.users.map(row => (*/}
                        {/*    <TableRow key={row.id}>*/}
                        {/*        <TableCell component="th" scope="row">*/}
                        {/*            {row.id}*/}
                        {/*        </TableCell>*/}
                        {/*        <TableCell align="right">{row.firstName}</TableCell>*/}
                        {/*        <TableCell align="right">{row.lastName}</TableCell>*/}
                        {/*        <TableCell align="right">{row.username}</TableCell>*/}
                        {/*        <TableCell align="right">{row.age}</TableCell>*/}
                        {/*        <TableCell align="right">{row.salary}</TableCell>*/}
                        {/*        <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>*/}
                        {/*        <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>*/}

                        {/*    </TableRow>*/}
                        {/*))}*/}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListComponent;