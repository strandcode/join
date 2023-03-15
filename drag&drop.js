/* const fill = document.querySelector('.work-task-D')
const empties = document.querySelectorAll('.work-steps-D')
fill.addEventListener('dragstart', dragStart)
fill.addEventListener('dragend', dragEnd)

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart() {
    this.className += ' hold'
    setTimeout(() => this.className = 'invisible', 0)
}
function dragEnd() {
    this.className = 'work-task-D'
}
function dragOver(e) {
    e.preventDefault()
}
function dragEnter(e) {
    e.preventDefault()
    this.className += ' hovered'
}
function dragLeave() {
    this.className = 'work-steps-D'
}
function dragDrop() {
    this.className = 'work-steps-D'
    this.append(fill)
} */