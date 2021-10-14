import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { v4 } from 'uuid';

function App() {
  const [text, setText] = useState("")
  const [ state, setState ] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    // console.log(data)
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    const copyItem = {...state[source.droppableId].items[source.index]}

    setState( prev => {
      prev = {...prev}

      prev[source.droppableId].items.splice(source.index, 1)

      prev[destination.droppableId].items.splice(destination.index, 0, copyItem)

      return prev
    })

  
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "title",
          items: [
            {
              id:v4(), 
              name: text
            }, 
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

  return (
    <div className="App">
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key}>
              <div>{data.title}</div>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}>
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided) => {
                              return(
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
