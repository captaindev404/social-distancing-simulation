// CONSTANTS
const width = 720
const height = 400
const NUMBER_OF_PEOPLE = 5

const DIRECTION = Object.freeze({
    NE: 'NE',
    NW: 'NW',
    SE: 'SE',
    SW: 'SW',
})

// VARIABLES
let crowd = []

// SETUP FUNCTIONS
function generateCrowd() {
    let crowd = []

    for (let i = 0; i < NUMBER_OF_PEOPLE; i++) {
        const person = new Person(`Instance ${i}`)
        crowd.push(person)
    }

    console.log(crowd)

    return crowd
}

function setup() {
    createCanvas(width, height)
    frameRate(10)
    ellipseMode(RADIUS)

    crowd = generateCrowd()
}

// DRAW
function draw() {
    background(200)

    for (let i = 0; i < crowd.length; i++) {
        crowd[i].bounceBorder()
    }
    for (let i = 0; i < crowd.length; i++) {
        crowd[i].display()
    }
    for (let i = 0; i < crowd.length; i++) {
        crowd[i].move()
    }
}

// GAME OBJECTS

const randomDirection = () => {
    const r = Math.round(random(0, 10))
    return r % 2 ? 1 : -1
}

class Person {
    constructor(id) {
        this.id = id
        this.infected = false
        this.xpos = random(10, width - 10)
        this.ypos = random(10, height - 10)
        this.rad = 10

        this.xspeed = 2
        this.yspeed = 2
        this.xdirection = randomDirection() // Left or Right
        this.ydirection = randomDirection() // Top to Bottom
    }

    move() {
        this.xpos = this.xpos + this.xspeed * this.xdirection
        this.ypos = this.ypos + this.yspeed * this.ydirection
    }

    bounceBorder() {
        if (this.xpos > width - this.rad || this.xpos < this.rad) {
            this.xdirection *= -1
        }
        if (this.ypos > height - this.rad || this.ypos < this.rad) {
            this.ydirection *= -1
            this.infected = true
        }
    }

    display() {
        ellipse(this.xpos, this.ypos, this.rad, this.rad).fill(
            this.infected ? 'red' : 'blue'
        )
    }
}
