import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { makeStyles } from '@mui/styles'
import { Button, Typography, Grid, TextField } from '@mui/material'
import { v4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // width: '100%',
    // height: '100%',
    // justifyContent: 'space-evenly'
  },
  column: {
    width: '20%',
  },
  droppable: {
    width: '100%',
    minHeight: '500px',
    backgroundColor: '#e0e0e0',
    flexDirection: 'column',
    display: 'flex',
    borderRadius: '7px',
    padding: '10px'
  },
  item: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    padding: '10px',
    borderRadius: '7px',
    marginBottom: '10px'
  }
}))

function App() {
  const classes = useStyles()
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
          title: "Todo",
          items: [
            {
              id: v4(), 
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
    <Grid className={classes.root}>
      <Grid container alignItems="center" direction="column">
        <div>
          <TextField type="text" label="Add a task..." variant="standard" value={text} onChange={(e) => setText(e.target.value)} />
          <Button onClick={addItem}>Add</Button>
        </div>
        <Grid container>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container direction="row" justifyContent="space-around">
              {_.map(state, (data, key) => {
                return (
                  <div key={key} variant="h1" className={classes.column}>
                    <Typography variant="h4">{data.title}</Typography>
                    <Droppable droppableId={key}>
                      {(provided) => {
                        return (
                          <div 
                            className={classes.droppable}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {data.items.map((el, index) => {
                              return(
                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                  {(provided) => {
                                    return(
                                      <div
                                      className={classes.item}
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
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
