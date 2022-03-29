// @flow

import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import Popup from 'reactjs-popup';


class Houston extends React.Component {
    state = {
        low_level_data: [{
            "id": "null",
            "app_name": "null",
            "instance": "null",
            "state": "null",
        },]
    }

    high_level_data = [
        {
            id: 1,
            misc_components: this.get_card_template("DA-FEEDHANDLER", "MISC"),
            da_basis: this.get_card_template("DA-BASIS", "DA-BASIS"),
            da_funding: this.get_card_template("DA-FUNDING", "DA-FUNDING"),
            da_pca: this.get_card_template("DA-PCA", "DA-PCA"),
        },
        {
            id: 2,
            misc_components: this.get_card_template("DA-INSTRUMENT-DATA", "MISC"),
            da_basis: this.get_card_template("DA-TYBURN", "DA-BASIS"),
            da_funding: this.get_card_template("DA-TYBURN", "DA-FUNDING"),
            da_pca: this.get_card_template("DA-TYBURN", "DA-PCA"),
        },
        {
            id: 3,
            da_basis: this.get_card_template("DA-ACCOUNT-INFO", "DA-BASIS"),
            da_funding: this.get_card_template("DA-ACCOUNT-INFO", "DA-FUNDING"),
            da_pca: this.get_card_template("DA-ACCOUNT-INFO", "DA-PCA"),
        },
        {
            id: 4,
            da_basis: this.get_card_template("DA-FEED-AGGREGATOR", "DA-BASIS"),
        },
    ]


    componentDidMount() {
        const ws = new WebSocket('ws://localhost:8000/ws/houston')
        ws.onmessage = this.onMessage

        this.setState({
            ws: ws,
            // Create an interval to send echo messages to the server
            interval: setInterval(() => ws.send('echo'), 1000)
        })
    }

    componentWillUnmount() {
        const {ws, interval} = this.state;
        ws.close()
        clearInterval(interval)
    }

    onMessage = (ev) => {
        const recv = JSON.parse(ev.data)
        // const {data} = this.state
        // data.push({value: recv.value})
        this.setState({low_level_data: recv})
    }

    get_overall_app_state_css(app_name, instance) {
        let apps = this.state.low_level_data.filter(function (app) {
            if (instance === "MISC") {
                return (app.app_name === app_name)
            } else {
                return (app.app_name === app_name) & (app.instance.includes(instance))
            }
        })
        const app_states = apps.map(item => item.state)
        if (app_states.includes("DEAD")) {
            return "red"
        } else if (app_states.includes("STOPPED")) {
            return "orange"
        } else if (app_states.includes("RUNNING")) {
            return "green"
        } else {
            return null
        }
    }

    get_card_template(name, instance) {
        return (
            <Card style={{width: '20rem', backgroundColor: this.get_overall_app_state_css(name, instance)}}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Popup
                        trigger={<Button variant="primary" className="button-small">View All</Button>}
                        position="right top"
                        on="hover"
                        closeOnDocumentClick
                        mouseLeaveDelay={300}
                        mouseEnterDelay={0}
                        contentStyle={{
                            padding: '0px', border: 'none', opacity: '1000', background: '#ffffff'
                        }}
                        arrow={false}
                    >
                        {this.get_view_all_template(name, instance)}
                    </Popup>
                    <Button variant="success" className="button-small">Start All</Button>
                    <Button variant="warning" className="button-small">Stop All</Button>
                    <Button variant="danger" className="button-small">Kill All</Button>
                </Card.Body>
            </Card>
        );
    }

    get_view_all_template(app_name, instance) {
        const popup_columns = [{
            dataField: 'app_name',
            text: 'App Name'
        }, {
            dataField: 'instance',
            text: 'Instance'
        }, {
            dataField: 'state',
            text: 'State'
        }, {
            dataField: 'start',
            text: 'Start'
        }, {
            dataField: 'stop',
            text: 'Stop'
        }]
        return (
            <BootstrapTable
                keyField="id"
                data={this.state.low_level_data.filter(function (app) {
                    if (instance === "MISC") {
                        return (app.app_name === app_name)
                    } else {
                        return (app.app_name === app_name) & (app.instance.includes(instance))
                    }
                })}
                columns={popup_columns}
                bordered={false}
                bootstrap4={true}
                striped={true}
            />
        )
    }

    columns = [{
        dataField: 'misc_components',
        text: 'MISC'
    }, {
        dataField: 'da_basis',
        text: 'DA-BASIS'
    }, {
        dataField: 'da_funding',
        text: 'DA-FUNDING'
    }, {
        dataField: 'da_pca',
        text: 'DA-PCA'
    }];


    render() {
        return (
            <div className="houston">
                <div className="container">
                    <div className="row align-items-left my-4">
                        <div className="col-sm-1">
                            <BootstrapTable
                                keyField="id"
                                data={this.high_level_data}
                                columns={this.columns}
                                bordered={false}
                                bootstrap4={true}
                                striped={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Houston;
