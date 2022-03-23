class GameState {
    constructor() {
        this.area = document.querySelector("#gamearea")
        this.image = document.createElement("img")
        this.table = document.createElement("table")
        this.gameOverParag = document.createElement("p")
        this.gameOverParag.style.display = "block"
        this.area.appendChild(this.image)
        this.area.appendChild(this.table)
        this.area.appendChild(this.gameOverParag)

        this.q = this.randomWord() // question
        this.guessed = this.q.split("").map(() => false) // chars of the question correctly guessed 
        this.guesses = [] // guessed letters
        this.misses = 0
        this.end = false

        this.drawLetters()
        this.drawTree()
    }
    // Gyuri
    // vesz egy véletlen szót egy listából.
    randomWord() {
        let word = wordList[Math.floor(Math.random() * wordList.length)]
        //console.log(word);
        return word
    } // word: string


    // Dávid
    // egy adott szóhoz a megfelelő mennyiségű táblázatcellát (aláhúzást) üresen kigenerálja az oldal megfelelő elemébe.
    // a táblázat celláiba a string elemeit teszi (_: üres)
    drawLetters ()
    {
        this.table.innerHTML = ""
        let tr = document.createElement("tr")
     
        const wordSplit = this.q.split("");
    
        for (let index = 0; index < wordSplit.length; index++) {
            let td = document.createElement("td")
            td.innerHTML = (this.guessed[index] || this.end) ? wordSplit[index] : "_"
            tr.appendChild(td)
        }
        this.table.appendChild(tr)
    }

    // Gyuri
    // paraméterként megkapja, hányadik lépést kell kirajzolni, és egy ahhoz tartozó képet rak az oldal megfelelő elemébe.
    drawTree(misses) {
        this.image.src = `./kepek/hangman${this.misses}.png`
    } // void

    // Gellért
    // kiír egy betűt egy számokat tartalmazó tömb alapján egy táblázatba (a megfelelő indexű helyekre), de mást nem módosít a táblázatban.
    // ehelyett egy display stringet módosít és ad vissza
    guess(char) {
        if (this.guesses.some(c => c == char)) return
        this.guesses.push(char)
        const hits = hit(char,this.q)
        hits.forEach(i => {
            this.guessed[i] = true
        })
        if (hits.length == 0) {
            this.misses++
            this.drawTree()
        } else {
            this.drawLetters()
        }
        this.checkGameEnd()
    }

    // Dávid
    // növeli egy lépésszámláló értékét, és ha az egy megadott számhoz ért, kiír egy üzenetet, hogy vége a játéknak (vereség).
    // ellenőrzi, hogy egy adott tömbben minden elem "igaz" értékű, és ha igen, kiír egy üzenetet, hogy vége a játéknak (győzelem).
    checkGameEnd() {

        if (this.guessed.every(el => el == true)) {
            this.gameOverParag.innerHTML = "You won"
            this.gameOverParag.display = "block"
        }

        else if (gameState.misses == 11) {
            this.end = true       
            this.gameOverParag.innerHTML = "You lost"
            this.gameOverParag.display = "block"
            this.drawLetters()
        }
    }

}
const gameState = new GameState()




// Gellért 
// egy betűről megmondja, hogy az benne van-e egy megadott szóban, és ha igen, pontosan mely helyeken.
// 0-tól indexel
function hit(char, string) {
    let hits = []
    string.split("").forEach((c, i) => {if (c == char) hits.push(i)})
    return hits
} // hits: int[]

// 
 

// 