const charactarId = document.getElementById('characterId')
const btnGo = document.getElementById('btn-go')
const content = document.getElementById('content')
const image = document.getElementById('img')
const btnReset = document.getElementById('btn-reset')
const conteinerResult = document.getElementById('result-style')

const fatchApi = (value) =>{
const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
.then((res) => res.json())
.then((data) =>{
    return data
 })

    return result
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode']
const newKeys = {
    name: 'Nome',
    status: 'Status',
    species: 'Especie',
    gender: 'Gênero',
    origin: 'Planeta de origem',
    episode: 'Episodios',
}

const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((elem) => {
       if (elem.checked === true && (Array.isArray(result[elem.name])) === true){
        const arrayResult = result[elem.name].join('\r\n')
        console.log(arrayResult)
        const newElem = document.createElement('p')
        newElem.innerHTML = `${newKeys[elem.name]} : ${arrayResult}`
        content.appendChild(newElem)
        
       } else if (elem.checked === true && (elem.name === 'origin')){
        const newElem = document.createElement('p')
        newElem.innerHTML = `${newKeys[elem.name]} : ${result[elem.name].name}`
        content.appendChild(newElem)

        } else if (elem.checked === true && typeof(result[elem.name]) !== 'object'){
        const newElem = document.createElement('p')
        newElem.innerHTML = `${newKeys[elem.name]} : ${result[elem.name]}`
        content.appendChild(newElem)
       }
    })

}

btnGo.addEventListener('click', async (event) => {
    event.preventDefault()

    if(charactarId.value === ''){
        return content.innerHTML = 'É necessário fazer um filtro.'
    }

    const result = await fatchApi(charactarId.value)
    if(content.firstChild === null){
        conteinerResult.className = 'result-style'
        image.src = `${result.image}`
        buildResult(result)
    } else {
        content.innerHTML = ''
        conteinerResult.className = 'result-style'
        image.src = `${result.image}`
        buildResult(result)
    }
}) 

btnReset.addEventListener('click', () => location.reload())