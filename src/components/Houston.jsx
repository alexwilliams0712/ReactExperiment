import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import Popup from 'reactjs-popup';

function Houston() {
    const columns = [{
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

    function get_all_app_statuses() {
        return (
            [
                {
                    id: 1,
                    app_name: "DA-TYBURN",
                    instance: "DA-BASIS.FTX_PERP",
                    state: "RUNNING",
                },
                {
                    id: 2,
                    app_name: "DA-TYBURN",
                    instance: "DA-BASIS.FTX_SPOT",
                    state: "DEAD",
                },
                {
                    id: 3,
                    app_name: "DA-TYBURN",
                    instance: "DA-BASIS.BINANCE_LINEAR",
                    state: "STOPPED",
                },
                {
                    id: 4,
                    app_name: "DA-FEED-AGGREGATOR",
                    instance: "DA-BASIS.DOGE",
                    state: "RUNNING",
                },
                {
                    id: 5,
                    app_name: "DA-FEED-AGGREGATOR",
                    instance: "DA-BASIS.LUNA",
                    state: "RUNNING",
                },
                {
                    id: 6,
                    app_name: "DA-TYBURN",
                    instance: "DA-FUNDING.FTX_PERP",
                    state: "STOPPED",
                },
                {
                    id: 7,
                    app_name: "DA-FEEDHANDLER",
                    instance: "FTX_PERP.DOGE.TOP_OF_BOOK",
                    state: "RUNNING",
                },
                {
                    id: 8,
                    app_name: "DA-FEEDHANDLER",
                    instance: "FTX_SPOT.DOGE.TOP_OF_BOOK",
                    state: "RUNNING",
                },
                {
                    id: 9,
                    app_name: "DA-FEEDHANDLER",
                    instance: "BINANCE_LINEAR.DOGE.TOP_OF_BOOK",
                    state: "RUNNING",
                },
                {
                    id: 10,
                    app_name: "DA-FEEDHANDLER",
                    instance: "BYBIT_LINEAR.DOGE.TOP_OF_BOOK",
                    state: "RUNNING",
                },
                {
                    id: 11,
                    app_name: "DA-BASIS",
                    instance: "DA-BASIS.DOGE",
                    state: "RUNNING",
                },
                {
                    id: 12,
                    app_name: "DA-BASIS",
                    instance: "DA-BASIS.LUNA",
                    state: "STOPPED",
                },
            ]
        )
    }

    function get_view_all_template(app_name, instance) {
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
                data={get_all_app_statuses().filter(function (app) {
                    if (instance === "MISC")
                    {return (app.app_name === app_name)} else {
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

    function get_overall_app_state_css(app_name, instance) {
        let apps = get_all_app_statuses().filter(function (app) {
            if (instance === "MISC")
            {return (app.app_name === app_name)} else {
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

    function get_card_template(name, instance) {
        return (
            <Card style={{width: '20rem', backgroundColor: get_overall_app_state_css(name, instance)}}>
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
                        {get_view_all_template(name, instance)}

                    </Popup>
                    <Button variant="success" className="button-small">Start All</Button>
                    <Button variant="warning" className="button-small">Stop All</Button>
                    <Button variant="danger" className="button-small">Kill All</Button>
                </Card.Body>
            </Card>
        );
    }


    let data = [
        {
            id: 1,
            misc_components: get_card_template("DA-FEEDHANDLER", "MISC"),
            da_basis: get_card_template("DA-BASIS", "DA-BASIS"),
            da_funding: get_card_template("DA-FUNDING", "DA-FUNDING"),
            da_pca: get_card_template("DA-PCA", "DA-PCA"),
        },
        {
            id: 2,
            misc_components: get_card_template("DA-INSTRUMENT-DATA", "MISC"),
            da_basis: get_card_template("DA-TYBURN", "DA-BASIS"),
            da_funding: get_card_template("DA-TYBURN", "DA-FUNDING"),
            da_pca: get_card_template("DA-TYBURN", "DA-PCA"),
        },
        {
            id: 3,
            da_basis: get_card_template("DA-FEED-AGGREGATOR", "DA-BASIS"),
        },
        {
            id: 4,
            da_basis: get_card_template("DA-ACCOUNT-INFO", "DA-BASIS"),
            da_funding: get_card_template("DA-ACCOUNT-INFO", "DA-FUNDING"),
            da_pca: get_card_template("DA-ACCOUNT-INFO", "DA-PCA"),
        },
        {
            id: 5,
            da_basis: get_card_template("DA-FEED-AGGREGATOR", "DA-BASIS"),
        }
    ]
    return (
        <div className="houston">
            <div className="container">
                <div className="row align-items-left my-4">
                    <div className="col-sm-1">
                        <BootstrapTable
                            keyField="id"
                            data={data}
                            columns={columns}
                            bordered={false}
                            bootstrap4={true}
                            striped={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Houston;
