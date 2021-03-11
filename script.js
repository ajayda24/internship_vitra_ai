//State
var todoArray = []
var undoState = []
var undoStateElements = []
var redoState = []
var redoStateElements = []

var undoRedoState = []
var undoRedoStateElements = []


//Functions
const refreshTodo = () => {
  document.querySelector('#newtask input').placeholder = 'Task to be done'

  document.querySelector('#tasks').innerHTML = ''

  for (let i = 0; i < todoArray.length; i++) {
    let list = `

       <div class="task" id="${todoArray[i].id}">
            <span id="taskname"> ${todoArray[i].text} </span>
            <button class="delete" onclick="remove(this)">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>`
    document.querySelector('#tasks').innerHTML += list
  }
  document.querySelector('#newtask input').value = ''

  if (todoArray.length > 0) {
    document.querySelector('#tasks').style.padding = '30px 20px'
  } else {
    document.querySelector('#tasks').style.padding = '0px'
  }
}

const add = () => {
  var text = document.querySelector('#newtask input').value
  if (text.length > 0) {
    var todo = { id: todoArray.length + 1, text: text }
    todoArray.unshift(todo)
    refreshTodo()
    undoState.push('add')
    
  } else {
    document.querySelector('#newtask input').placeholder = 'Please Enter a Text'
  }
}

const remove = (el) => {
  console.log('get here')
  var removedTodo = todoArray.filter(({ id }) => id == el.parentElement.id)
  todoArray = todoArray.filter(({ id }) => id != el.parentElement.id)
  undoState.push('remove')
  undoStateElements = undoStateElements.concat(removedTodo)
  refreshTodo()
}

const undo = () => {
  console.log(undoStateElements)
  if (undoState.length != 0) {
    if (undoState[undoState.length - 1] == 'add') {
      redoState.push('addUndo')
      redoStateElements.push(todoArray[todoArray.length - 1])
      todoArray.pop()
      undoState.pop()
    }
    if (undoState[undoState.length - 1] == 'remove') {
      undoRedoState.push('added-by-undo')
      undoRedoStateElements.push(
        undoStateElements[undoStateElements.length - 1]
      )

      todoArray.push(undoStateElements[undoStateElements.length - 1])
      redoState.push('removeUndo')
      redoStateElements.push(todoArray[todoArray.length - 1])
      undoState.pop()
      undoStateElements.pop()
    }
    if (undoRedoState[undoRedoState.length - 1] == 'redo') {
      undoStateElements.pop()
      undoState.pop()
      todoArray.pop()
    }
  }
  refreshTodo()
}

const redo = () => {
  if (redoState.length != 0) {
    if (redoState[redoState.length - 1] == 'addUndo') {
      todoArray.push(redoStateElements[redoStateElements.length - 1])
      // undoRedoState.push('redo')
      // undoRedoStateElements.push(redoStateElements[redoStateElements.length - 1])
      redoState.pop()
      redoStateElements.pop()
    }

    if (redoState[redoState.length - 1] == 'removeUndo') {
      // undoRedoState.push('redo')
      // undoRedoStateElements.push(redoStateElements[redoStateElements.length - 1])

      todoArray.pop()
      redoState.pop()
      redoStateElements.pop()
    }
    if (redoState[redoState.length - 1] == 'undo') {
      // undoRedoState.push('redo')
      // undoRedoStateElements.push(redoStateElements[redoStateElements.length - 1])
      todoArray.push(redoStateElements[redoStateElements.length - 1])
      redoState.pop()
      redoStateElements.pop()
    }
  }
  refreshTodo()
}
