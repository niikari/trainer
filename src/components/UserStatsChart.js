import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function UserStatsChart(props) {

    

    return (
        <>
        <BarChart                                               
            width={500}
            height={500}
            data={props.userTrainings}
            margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
            >
            <XAxis dataKey="activity" />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar barSize={80}  dataKey="duration" fill="#82ca9d" />
            <YAxis />
        </BarChart>
        </>
    )
}