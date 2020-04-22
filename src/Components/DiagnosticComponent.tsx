import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import XforceAPI from "../Services/XforceAPI";
import {injectIntl} from 'react-intl';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';

//CONSTANTS
import {EMERGENCY_LEVEL_4, EMERGENCY_LEVEL_5, EMERGENCY_NUMBERS} from "../utils/Constants";

import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel, Grid, IconButton,
    InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText,
    MenuItem,
    Radio,
    RadioGroup,
    Select, Slider, Tooltip, withStyles
} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './main.css';
import {IDiagnostic} from "../Interfaces";
import {TypeQuestionEnum} from "../enums/TypeQuestionEnum";
import { v4 as uuidv4 } from 'uuid';

interface IState {
    diagnostic: IDiagnostic | null;
    sex: string;
    age: number;
    response: any;
    components: any;
    questions: any;
    questionSingle: any;
    results: any;
    departamento: string;
    disabled: boolean;
    emergencyNumbers : INumberEmergency | null;
    showMessage: boolean;
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


class DiagnosticComponent extends Component <any, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            disabled: false,
            departamento: 'Beni',
            diagnostic: null,
            age: 50,
            sex: "female",
            components: null,
            questions: null,
            questionSingle: null,
            results: null,
            response: null,
            emergencyNumbers : null,
            showMessage: false
        }
    }

    componentDidMount() {
       // Promise.all([XforceAPI.getEmergencyNumbers()]).then( res => {
            this.setState({
                emergencyNumbers: EMERGENCY_NUMBERS //(res && res[0] && res[0].data) || []
            });
        // });
    }

    showQuedateEnCasa = (show: boolean) => {
        this.setState({
            showMessage: show
        });
    }

    searchDepartmentNumbers = (department: string) => {
        if(this.state.emergencyNumbers){
            const ans = this.state.emergencyNumbers.departamentos.find(x => x.departamento === department);
            return ans && ans.numeros ? ans.numeros : [];
        }
        return [];
    }

    prepareRequestFromSelects = () => {
        const diagnostic: IDiagnostic = {
            sex: this.state.sex,
            age: this.state.age,
            evidence: this.state.questions ? this.state.questions : []
        }
        return diagnostic;
    }

    prepareRequestFromRadioButton = () => {
        const diagnostic: IDiagnostic = {
            sex: this.state.sex,
            age: this.state.age,
            evidence: this.state.questions ? [...this.state.questions, ...this.state.questionSingle] : []
        }
        this.setState({
            questionSingle: null,
            questions: [...this.state.questions, ...this.state.questionSingle]
        });

        return diagnostic;
    }

    continue = () => {
        this.setState({
            disabled: true
        });
        if(this.state.response && this.state.response.should_stop) {
            this.getEndResult();
        }
        else {
            this.getQuestions();
        }
    }

    getQuestions = () => {
        const diagnostic = this.state.questionSingle ? this.prepareRequestFromRadioButton() : this.prepareRequestFromSelects();
        XforceAPI.getQuestion(diagnostic).then(res => {
            this.setState({
                response: res.data,
                },() => {
                    this.state.response && this.state.response.should_stop
                    && this.getEndResult();
                });

        });
    }

    getEndResult = () => {
        const request = this.prepareRequestFromSelects();
        XforceAPI.getEndResult(request).then(res => {
            this.setState({
                results: res.data,
            });
        });
    }

    InitialValues = () => {
        this.setState({
            diagnostic: null,
            age: 50,
            sex: "female",
            components: null,
            questions: null,
            questionSingle: null,
            results: null,
            response: null,
            disabled: false,
            departamento: 'Beni'
        });
    }

    onChangeGroupSingle = (event: React.ChangeEvent<{ value: unknown, name?: string}>) => {
        const  questionId = event.target.value;
        const  questionValue = "present";
        const evidence = [{id: questionId, choice_id: questionValue}];
         this.setState({
            questionSingle: evidence
        })
    };

    onChangeSelectQuestion = (event: React.ChangeEvent<{ value: unknown, name?: string}>) => {
        const  questionId = event.target.name;
        const  questionValue = (event.target.value as string);

        const evidence = [{id: questionId, choice_id: questionValue}];
        const answers = this.state.questions ? [...evidence, ...this.state.questions]: evidence;
        let uniques =  this.getUniques(answers, "id");
        this.setState({
            questions: uniques
        }, () => {
        });
    };

    getValue = (questionId: string) => {
        const res = this.state.questions ? (this.state.questions.find((q:any)=> q.id === questionId)) : null;
        return  res ? res["choice_id"]: ' ';
    }

    getUniques(arr: any, comp: string) {
        return arr
            .map((e: any) => e[comp])
            .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
            .filter((e: any) => arr[e]).map((e: any) => arr[e]);
    }

    onChangeSex = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({
            sex: event.target.value as string
        });
    };

    onChangeAge = (event: any, newValue: number | number[]) => {
        this.setState({
            age: (newValue as number)
        });
    };

    onChangeDepartamento = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({
            departamento: (event.target.value as string)
        });
    };

    onEnd = () => {
        this.showQuedateEnCasa(true);
        this.InitialValues();
    }

    render() {
        const {intl} = this.props;
        const { showMessage, age } = this.state;
        return (
            <div className="Diagnostic">
                <Typography variant="h6" component="h2" className={"title"}>
                    Realiza el test
                </Typography>
                { !this.state.disabled && (
                    <React.Fragment>
                        <Typography variant="body2" component="h2" className="titleService result">
                            • El test no es un diagnóstico final
                            <Typography variant="caption" component="h2" className="contentService">
                                El test es solo para fines informativos y no representa,
                                de ninguna manera, una opinión médica final.
                            </Typography>
                        </Typography>
                        <Typography variant="body2" component="h2" className="titleService result">
                            • El test y sus resultados
                            <Typography variant="caption" component="h2" className="contentService">
                                Se basan completamente en las pautas de la OMS(Organización Mundial de la Salud) y los
                                CDC(Centros para el Control y Prevención de Enfermedades) sobre COVID-19.
                            </Typography>
                        </Typography>
                        <Typography variant="body2" component="h2" className="titleService result">
                            • En caso de emergencia
                            <Typography variant="caption" component="h2" className="contentService">
                                Llame al número de emergencia de su departamento de inmediato.
                                No continúe con este test.
                            </Typography>
                        </Typography>
                        <Typography variant="body2" component="h2" className="titleService result">
                            • Tu información es anónima
                            <Typography variant="caption" component="h2" className="contentService">
                                La información que usted proporciona es anónima y no se comparte con nadie.
                            </Typography>
                        </Typography>
                        <Divider/>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <FormControl className="inputFull" disabled={this.state.disabled}>
                                    <InputLabel id="input-dep" className="titleSelect">Departamento</InputLabel>
                                    <Select
                                        labelId="input-dep"
                                        id="departamento"
                                        value={this.state.departamento}
                                        onChange={this.onChangeDepartamento}
                                    >
                                        <MenuItem value="Beni">Beni</MenuItem>
                                        <MenuItem value="Chuquisaca">Chuquisaca</MenuItem>
                                        <MenuItem value="Cochabamba">Cochabamba</MenuItem>
                                        <MenuItem value="La Paz">La Paz</MenuItem>
                                        <MenuItem value="Oruro">Oruro</MenuItem>
                                        <MenuItem value="Pando">Pando</MenuItem>
                                        <MenuItem value="Potosí">Potosí</MenuItem>
                                        <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                                        <MenuItem value="Tarija">Tarija</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className="inputFull" disabled={this.state.disabled}>
                                    <InputLabel id="demo-simple-select-label" className={"titleSelect"}>Sexo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="sexo"
                                        value={this.state.sex}
                                        onChange={this.onChangeSex}
                                    >
                                        <MenuItem value="female">Femenino</MenuItem>
                                        <MenuItem value="male">Masculino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="input-slider" gutterBottom className={"titleSlider"}>
                                    Edad: {age}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <PrettoSlider
                                    defaultValue={50}
                                    onChange={this.onChangeAge}
                                    className={"slide"}
                                    aria-label="pretto slider"
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
                { this.state.disabled && (
                    <React.Fragment>
                        <Grid container spacing={0} className="detailsQuiz">
                            <Grid item xs>
                                <Typography variant="body2" component="h1" className="titleInformation">
                                    Departamento
                                </Typography>
                                <InputLabel key={uuidv4()} className="textInformation">{this.state.departamento}</InputLabel>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" component="h1" className="titleInformation">
                                    Edad
                                </Typography>
                                <InputLabel key={uuidv4()} className="textInformation">{this.state.age}</InputLabel>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" component="h1" className="titleInformation">
                                    Sexo
                                </Typography>
                                <InputLabel key={uuidv4()} className="textInformation">{intl.formatMessage({id: this.state.sex})}</InputLabel>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
                {
                    this.state.response && !this.state.response.should_stop && this.state.response.question.explanation &&
                        <>
                            <Typography variant="body2" component="h1" className="explanation">
                                {this.state.response.question.explanation}
                            </Typography>
                        </>
                }
                <>
                {
                    this.state.response && !this.state.response.should_stop && this.state.response.question.type === TypeQuestionEnum.group_multiple &&
                        this.state.response.question.items.map((item:any)=> {
                            return(<>
                                    <FormControl className="symptom" key={item.id+"form"}>
                                    <InputLabel key={item.id+"in"} className="titleQuestion">{item.name}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id={item.name}
                                        value={this.getValue(item.id)}
                                        onChange={this.onChangeSelectQuestion}
                                        key = {item.id+"sel"}
                                        name = {item.id}
                                        className="select"
                                    >
                                    {
                                        item.choices.map((option: any) => {
                                            return ( <MenuItem key={option.id+'men'} value={option.id}>{option.label}</MenuItem>
                                            )})
                                    }
                                    </Select>
                                        {
                                            item.explanation && <FormHelperText className="helpText">{item.explanation}</FormHelperText>
                                        }
                                </FormControl>
                                </>
                            );
                        })
                }</>
                <>
                {
                    this.state.response && !this.state.response.should_stop && this.state.response.question.type === TypeQuestionEnum.single &&
                    this.state.response.question.items.map((item:any)=> {
                        return(<>
                                <FormControl className="symptom" key={item.id+"form"}>
                                    <InputLabel key={item.id+"in"} className="titleQuestion">{item.name}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id={item.id}
                                        value={this.getValue(item.id)}
                                        onChange={this.onChangeSelectQuestion}
                                        key = {item.id+"sel"}
                                        name = {item.id}
                                        className="select"
                                    >
                                        {
                                            item.choices.map((option: any) => {
                                                return ( <MenuItem key={option.id+'men'} value={option.id}>{option.label}</MenuItem>
                                                )})
                                        }
                                    </Select>
                                    {
                                        item.explanation && <FormHelperText className="helpText">{item.explanation}</FormHelperText>
                                    }
                                </FormControl>
                            </>
                        );
                    })
                }
                </>
                <>
                    {
                        this.state.response && !this.state.response.should_stop && this.state.response.question.type === TypeQuestionEnum.group_single &&
                        <>
                            <FormControl className="symptom" key={"Singleform"}>
                                <FormLabel component="legend">{this.state.response.question.text}</FormLabel>
                                <RadioGroup name="SINGLE"
                                            value={this.state.questionSingle ?
                                                this.state.questionSingle[0].id: ' '}
                                            onChange={this.onChangeGroupSingle}>
                                    {this.state.response.question.items.map((item:any)=> {
                                        return(<><FormControlLabel value={item.id} control={<Radio size="small" color="primary"/>} label={item.name} className="radioButton"/></>)
                                    })
                                    }
                                </RadioGroup>
                                <FormHelperText>{this.state.response.text}</FormHelperText>
                            </FormControl>
                        </>
                    }
                </>
                {
                    this.state.results &&
                    <div className={"result "+ this.state.results.triage_level}>
                        <Typography variant="body2" component="h1">
                            {this.state.results.description}
                        </Typography>
                        <Typography variant="body1" component="h1">
                            {this.state.results.label}
                        </Typography>
                        <br/>
                    </div>
                }
                { !this.state.results &&
                    <Button variant="contained" onClick={() => this.continue()} endIcon={<NavigateNextIcon/>}>
                    Siguiente
                    </Button>
                }
                { this.state.results && (this.state.results.triage_level === EMERGENCY_LEVEL_4 || this.state.results.triage_level === EMERGENCY_LEVEL_5) &&
                     this.emergencyNumbers()
                }
                { this.state.results &&
                <Button variant="contained" onClick={() => this.onEnd()} endIcon={<NavigateNextIcon />}>
                    Finalizar
                </Button>}
                <br/><br/>
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

    emergencyNumbers = () => {
        return <React.Fragment>
            <Typography variant="body1" component="h1" className="titleInformation">
                Números disponibles para {this.state.departamento}
            </Typography>
            {this.listPhoneNumbers(this.searchDepartmentNumbers(this.state.departamento))}
            {this.listPhoneNumbers(this.searchDepartmentNumbers('Nacional'))}
        </React.Fragment>;
    }

    listPhoneNumbers = (list: INumeros[]) => {
        return <List className="emergency-phone">
            {list.map((elem:INumeros) => {
                return (
                    <ListItem key={uuidv4()} className="item" >
                        <ListItemText id={uuidv4()} primary={elem.numero} secondary={elem.descripcion}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <a href={`tel:${elem.numero}`}><PhoneEnabledIcon/></a>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })
            }
        </List>;
    }
}

export default injectIntl(DiagnosticComponent);

const PrettoSlider = withStyles({
    root: {
        color: '#404040',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);
