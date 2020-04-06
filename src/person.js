const INFECTED_PERSON_COLOR = 'red'
const SANE_PERSON_COLOR = 'blue'
const HEALED_PERSON_COLOR = 'green'
class Person {
    constructor(id, infected, time, distancing) {
        this.id = id
        this.infected = infected || false
        this.xpos = random(10, width - 10)
        this.ypos = random(10, height - 10)
        this.rad = 10
        this.infectedTime = time
        this.xspeed = distancing ? 0 : 1
        this.yspeed = distancing ? 0 : 1
        this.xdirection = randomDirection() // Left or Right
        this.ydirection = randomDirection() // Top to Bottom
        this.healed = null
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

    checkCollision(peoples, time) {
        peoples.forEach((p) => {
            checkCollision(this, p, time)
        })
    }

    checkHealed(time) {
        if (time > 5) {
            debugger
        }
        if (time - this.infectedTime > 4) {
            this.infected = false
            this.healed = true
        }
    }
    update(time) {
        this.checkHealed(time)
        this.bounceBorder()
        this.move()
    }

    display() {
        let color = SANE_PERSON_COLOR
        if (this.infected) {
            color = INFECTED_PERSON_COLOR
        } else if (this.healed) {
            color = HEALED_PERSON_COLOR
        }
        fill(color)
        ellipse(this.xpos, this.ypos, this.rad, this.rad)
    }
}
