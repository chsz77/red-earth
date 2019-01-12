import React from "react"
import ImagesList from "../components/ImagesList"
import Searchbar from "../components/Searchbar"

 

const Mainpage = props => (
    <div>
        <Searchbar {...props}/>
        <ImagesList {...props}/>
    </div>
)

export default Mainpage