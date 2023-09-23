import React, {useState, useEffect} from "react";
import "./style.css"
import Nav from "./Nav"
import Search from "./Search"
import Repositories from "./Repositories";
import { getRepositories, createRepository, destroyRepository } from "../../services/api";
import { Link } from "react-router-dom";

const userID = "64fb680cc144866c44027ff7"

const MainPage = () => {

   const [repositories, setRepositories] = useState([])
   const [loading, setLoading] = useState(true)
   const[loadingError, setLoadingError] = useState(false)

   const loadData = async(query = "") => {
      try {
         setLoading(true)
         const response = await getRepositories(userID, query)
         setRepositories(response.data)
         setLoading(false)
      } catch (err) {
         console.error(err)
         setLoadingError(true)
      }
   }

   useEffect(() => {
      (async () => await loadData())()
   }, [])

   const handleLogout = () => {
      console.log("Logout")
   }

   const handleSearch = (query) => {
      console.log("procurando: ", query)
      loadData(query)
   }

   const handleDeleteRepo = async (repository) => {
      console.log("Remove Repo: ", repository)
      await destroyRepository(userID, repository._id)
      await loadData()
   }

   const handleAddRepo = async (url) => {
      console.log("Add Repo: ", url)
      try {
         await createRepository(userID, url)
         await loadData()
      } catch (err) {
         console.error(err)
         setLoadingError(true)
      }
   }

   if(loadingError){
      return(
         <div className="loading">Erro ao carregar dados de repositório. <Link to="/login">Voltar</Link></div>
      )
   }

   if(loading){
      return(
         <div className="loading">Carregando...</div>
      )
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