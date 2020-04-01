const INFECTED_PERSON_COLOR = 'red'
const SANE_PERSON_COLOR = 'blue'
const HEALED_PERSON_COLOR = 'green'
class Person {
    constructor(id, infected) {
        this.id = id
        this.infected = infected || false
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
            // this.infected = true
        }
    }

    checkCollision(peoples) {
        peoples.forEach(p => {
            checkCollision(this, p)
        })
    }

    update() {
        this.bounceBorder()
        this.move()
    }

    display() {
        if(this.infected){
            debugger
        }
        fill(this.infected ? INFECTED_PERSON_COLOR : SANE_PERSON_COLOR)
        ellipse(this.xpos, this.ypos, this.rad, this.rad)
    }
}
