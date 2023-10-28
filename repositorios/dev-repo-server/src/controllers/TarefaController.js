
class TesteController{
    async mostrarPalavra(req, res){

        let meuArray = ["aviao", "carro", "gorila", "dinossauro","chocolate", "bacon"]

        let numeroAleatorio = Math.floor(Math.random() * meuArray.length);

        return res.json({frase : meuArray[numeroAleatorio]})

    }
}

export default new TesteController()