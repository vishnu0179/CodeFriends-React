import React from 'react'
//import Plot from 'react-plotly.js'
import { useProfile } from './../Context/ProfileProvider'
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";


export default function Graph() {

    const { contestDetail } = useProfile();

    
    const ratingList = contestDetail.ratingList;
    const contestName = contestDetail.contestName;
    const contestTime = contestDetail.contestTime;

    const contestDates = contestTime.map((time) => {
        return new Date(time*1000)
    })

    //console.log(contestDates)
    var trace = {
        y : ratingList,
        x : contestDates,
        type:'scatter',
        mode: 'lines+markers',
        text: contestName 
    }


    var res = [trace]

    var layout = {
        title: 'Rating Changes History',
        xaxis : {
            title: 'Date'
        },
        yaxis: {
            title: 'Rating'
        },
        width: 620, 
        height: 360
    }

    const Plot = createPlotlyComponent(Plotly);

    //Plotly.newPlot('myGraph', res, layout)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col" id="myGraph">
                    <Plot
                        data = {res}
                        layout = {layout}
                    />
                </div>
            </div>
        </div>
    )
}


