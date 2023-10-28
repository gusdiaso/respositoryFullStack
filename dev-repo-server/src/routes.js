import { Router } from "express";
import auth from "./middlewares/auth"
import UsersController from "./controllers/UsersController";
import RepositoriesControllers from "./controllers/RepositoriesControllers";
import SessionsController from "./controllers/SessionsController";
import TarefaController from "./controllers/TarefaController"



const routes = new Router()

// routes.get("/teste", TarefaController.mostrarPalavra)
routes.post("/sessions", SessionsController.create)

routes.use(auth)

routes.get("/users", UsersController.index)
routes.get("/users/:id", UsersController.show)
routes.post("/users", UsersController.create)
routes.put("/users/:id", UsersController.update)
routes.delete("/users/:id", UsersController.destroy)

routes.get("/users/:user_id/repositories", RepositoriesControllers.index)
routes.post("/users/:user_id/repositories", RepositoriesControllers.create)
routes.delete("/users/:user_id/repositories/:id", RepositoriesControllers.destroy)

export default routes