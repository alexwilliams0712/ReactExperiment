import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Footer, Home, Houston, ManualTrades, Navigation, Orders, PnL, StrategyConfig, Trades} from "./components";

ReactDOM.render(
    <Router>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/houston" element={<Houston/>}/>
            <Route path="/strategy_config" element={<StrategyConfig/>}/>
            <Route path="/pnl" element={<PnL/>}/>
            <Route path="/trades" element={<Trades/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/manual_trades" element={<ManualTrades/>}/>
        </Routes>
        <Footer/>
    </Router>,

    document.getElementById("root")
);

serviceWorker.unregister();