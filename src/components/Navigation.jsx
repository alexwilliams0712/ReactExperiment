import React from "react";
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        DigitalAssets
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/houston">
                                    Houston
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/strategy_config">
                                    StrategyConfig
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/pnl">
                                    PnL
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trades">
                                    Trades
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    Orders
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/manual_trades">
                                    ManualTrades
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
