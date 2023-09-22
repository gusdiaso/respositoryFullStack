import React, {useState, useEffect} from "react";
import "./style.css"
import Nav from "./Nav"
import Search from "./Search"
import Repositories from "./Repositories";
import { getRepositories } from "../../services/api";


const userID = "64fb680cc144866c44027ff7"

const MainPage = () => {

   const [repositories, setRepositories] = useState([])

   const loadData = async(query = "") => {
      const response = await getRepositories(userID)
      console.log(response.data)
      setRepositories(response.data)
   }

   useEffect(() => {
      (async () => await loadData())()
   }, [])

   const handleLogout = () => {
      console.log("Logout")
   }

   const handleSearch = (query) => {
      console.log("procurando: ", query)
   }

   const handleDeleteRepo = (repository) => {
      console.log("Deletando: ", repository)
   }

   const handleAddRepo = (url) => {
      console.log("Add Repo: ", url)
   }


   return (
      <div id="main">
         <Nav onLogout={handleLogout}></Nav>
         <Search onSearch={handleSearch}></Search>
         <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleAddRepo}></Repositories>
      </div>
   )
}

export default MainPage