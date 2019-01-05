import React from 'react'
import './Loading.css'

export const Loading = () => (
    <div className="loading">
        <div className="lds-ripple"><div></div><div></div></div>
    </div>)

export const Spinner = () =>(
    <div className="lds-dual-ring"></div>
)