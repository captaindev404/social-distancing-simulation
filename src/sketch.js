// CONSTANTS
const width = 1280
const height = 740
const NUMBER_OF_PEOPLE = 100
const FRAME_RATE = 60
let frameCount = 0
const ellapsedSecond = (count ) => Math.round(count / FRAME_RATE)

// VARIABLES
let peoples = []

// SETUP FUNCTIONS
function generateCrowd() {
    let crowd = []

    for (let i = 0; i < NUMBER_OF_PEOPLE; i++) {
        const person = new Person(i, i == 0 ? true : undefined, i == 0 ? 0 : undefined)
        crowd.push(person)
    }

    console.log(crowd)

    return crowd
}

function setup() {
    createCanvas(width, height)
    frameRate(FRAME_RATE)
    ellipseMode(RADIUS)

    peoples = generateCrowd()
}

// DRAW
function draw() {
    background(200)

    fill('blue')
    textSize(20)
    const seconds = ellapsedSecond(frameCount)
    text(seconds, width - 100, height - 100, width - 100, height - 100)

    for (let person of peoples) {
        person.update(seconds)
        person.checkCollision(peoples.filter((p) => p.id !== person.id), seconds)
        person.display()
    }

    const infectedCount = peoples.filter(p => p.infected).length
    const infectedLabel = `Infected peoples: ${infectedCount}`
    fill('red')
    textSize(20)
    text(infectedLabel, 10,10,110,110)

    if(infectedCount >= 100){
        noLoop()
    }
    frameCount++
}
