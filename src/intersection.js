const checkCollision = (p1, p2, time) => {
    const distance = dist(p1.xpos, p1.ypos, p2.xpos, p2.ypos)
    if (distance < p1.rad + p2.rad) {
        if (p1.infected) {
            if (!p2.healed) {
              debugger
                p2.infected = true
                p2.infectedTime = time
            }
        }
    }
}
