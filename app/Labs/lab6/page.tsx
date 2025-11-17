"use client"

import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import PathParameters from "./PathParameters";
import Queryparameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
const HTTP_SERVER=process.env.NEXT_PUBLIC_HTTP_SERVER;
function lab6(){
    return(
        <div>
            <h1>lab 6</h1>
            <Queryparameters/>
            <HttpClient/>
            <a href={`${HTTP_SERVER}lab5/welcome`}>Welcome</a>
            <PathParameters/>
            <WorkingWithObjects/>
            <WorkingWithArrays/>
            <EnvironmentVariables/>
            <WorkingWithObjectsAsynchronously/>
            <WorkingWithArraysAsynchronously/>
        </div>
    )
}
export default lab6;