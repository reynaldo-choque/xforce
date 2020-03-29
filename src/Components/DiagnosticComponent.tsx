import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import XforceAPI from "../Services/XforceAPI";
import {injectIntl} from 'react-intl';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';

//CONSTANTS
import { EMERGENCY_LEVEL_4, EMERGENCY_LEVEL_5} from "../utils/Constants";

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel, Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
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
            age: 0,
            sex: "female",
            components: null,
            questions: null,
            questionSingle: null,
            results: null,
            response: null,
            emergencyNumbers : null
        }
    }

    componentDidMount() {
        Promise.all([XforceAPI.getEmergencyNumbers()]).then( res => {
            this.setState({
                emergencyNumbers: (res && res[0] && res[0].data) || []
            });
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
            },() => {
                // console.warn(this.state.results);
            });
        });
    }

    InitialValues = () => {
        this.setState({
            diagnostic: null,
            age: 0,
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
        }, () => {
            console.log(this.state.questionSingle[0].id);
        })
    };

    onChangeSelectQuestion = (event: React.ChangeEvent<{ value: unknown, name?: string}>) => {
        const  questionId = event.target.name;
        const  questionValue = (event.target.value as string);

        console.warn(questionId, questionValue);
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
    onChangeAge = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({
            age: parseInt(event.target.value as string)
        });
    };

    onChangeDepartamento = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({
            departamento: (event.target.value as string)
        });
    };

    onEnd = () => {
        this.InitialValues();
    }

    render() {
        const {intl} = this.props;
        return (
            <div className="Diagnostic">
                <Typography variant="h6" component="h2" className={"title"}>
                    Realiza tu diagnóstico
                </Typography>
                <Typography variant="body1" component="h2">
                    Se responsable con las preguntas
                </Typography>
                { !this.state.disabled && (
                    <React.Fragment>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
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
                                        <MenuItem value="Potosi">Potosi</MenuItem>
                                        <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                                        <MenuItem value="Tarija">Tarija</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className="input" disabled={this.state.disabled}>
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
                            <Grid item xs={6}>
                                <FormControl className="input" disabled={this.state.disabled}>
                                    <InputLabel id="demo-simple-select-label" className={"titleSelect"}>Edad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="edad"
                                        onChange={this.onChangeAge}
                                        value={this.state.age}
                                    >
                                        {
                                            Array.from(Array(101).keys()).map(age => {
                                                return (<option key={age} value={age}>{age}</option>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                <RadioGroup aria-label="ALGO" name="SINGLE"
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
                <br/>
                <br/>
                {
                    this.state.results &&
                    <div className="result">
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
                (
                    <React.Fragment>
                        {this.searchDepartmentNumbers(this.state.departamento).map(elem => <div className="emergency-phone"><a href={`tel:${elem.numero}`}>{elem.descripcion}</a><PhoneEnabledIcon /></div>)}
                    </React.Fragment>
                )}
                { this.state.results &&
                <Button variant="contained" onClick={() => this.onEnd()} endIcon={<NavigateNextIcon />}>
                    Finalizar
                </Button>}
                <br/><br/>
            </div>

        );
    }

}

export default injectIntl(DiagnosticComponent);