const workNotice = document.querySelectorAll('.work-Task-D')
const board = document.querySelectorAll('.work-steps-D')

workNotice.addEventListener('dragstart', dragStart)

board.forEach(boards => {
    boards.addEventListener('dragover', dragOver)
    boards.addEventListener('drop', dragDrop)
});

let beingDragged

function dragStart(e) {
    beingDragged = e.target
    console.log(beingDragged)
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop (e) {
    e.target.append(beingDragged)
    console.log(e.target)
}

