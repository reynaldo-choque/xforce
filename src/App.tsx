import React from 'react';

import XforceAPI from "./Services/XforceAPI";
import './App.css';
import Container from '@material-ui/core/Container';
import AppRouter from "./Components/AppRouter";

import {StatisticsContext} from './utils/Constants';
class App extends React.Component<any, any> {
    state = {
        boliviaData: null
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        XforceAPI.getQueryLimit().then(res => {
            if(res && res.data && res.data.resources && res.data.resources.core
                && res.data.resources.core.remaining && res.data.resources.core.remaining > 0) {
                //do query to get statistics
                XforceAPI.getBoliviaStatistics().then(boliviaData => {
                    if(boliviaData && boliviaData.data && boliviaData.data.content) {
                        this.setState({
                            boliviaData: boliviaData.data.content
                        })
                    }
                });
            } else {
                console.info("..");
            }
        });
    }

    render() {
        return (
          <StatisticsContext.Provider value={this.state.boliviaData}>
            <div className="App">
              <Container>
                  <AppRouter/>
              </Container>
            </div>
          </StatisticsContext.Provider>
        );
    }
}

export default App;
