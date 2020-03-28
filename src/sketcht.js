function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}

const s = (p) => {
    // CONSTANTS
    const width = 1280
    const height = 740
    const NUMBER_OF_PEOPLE = 20

    const DIRECTION = Object.freeze({
        NE: 'NE',
        NW: 'NW',
        SE: 'SE',
        SW: 'SW',
    })

    // VARIABLES
    let peoples = []

    // SETUP FUNCTIONS
    function generateCrowd() {
        let persons = []

        for (let i = 0; i < NUMBER_OF_PEOPLE; i++) {
            const person = new Person(`Instance ${i}`)
            persons.push(person)
        }

        console.log(persons)

        return persons
    }

    p.setup = function () {
        p.createCanvas(width, height)
        p.frameRate(30)
        p.ellipseMode(p.RADIUS)

        peoples = generateCrowd()
    }

    // DRAW
    p.draw = function () {
        p.background(200)

        for(let person of peoples){
            person.update()
            person.display()
        }

    }

    // GAME OBJECTS

    const randomDirection = () => {
        const r = Math.round(getRandomInt(0, 10))
        return r % 2 ? 1 : -1
    }

    function Person(id, color) {
        this.id = id
        this.infected = false
        this.xpos = getRandomInt(11, width - 11)
        this.ypos = getRandomInt(11, height - 11)
        this.rad = 15
        this.color = color
        this.xspeed = 4
        this.yspeed = 4
        this.xdirection = randomDirection() // Left or Right
        this.ydirection = randomDirection() // Top to Bottom

        this.move = function () {
            this.xpos = this.xpos + this.xspeed * this.xdirection
            this.ypos = this.ypos + this.yspeed * this.ydirection
        }

        this.bounceBorder = function () {
            if (this.xpos > width - this.rad || this.xpos < this.rad) {
                this.xdirection *= -1
            }
            if (this.ypos > height - this.rad || this.ypos < this.rad) {
                this.ydirection *= -1
                this.infected = true
            }
        }

        this.update = function(){
            this.bounceBorder()
            this.move()
        }

        this.display = function () {
            p.fill(this.infected ? 'red' : 'blue')
            p.ellipse(this.xpos, this.ypos, this.rad, this.rad)
        }
    }
}
let myp5 = new p5(s, 'body')
