// we need useState and useEffect hooks
import React,{useState,useEffect} from 'react'

// icons from react icons kit
// main Icon component
import { Icon } from 'react-icons-kit'

// icons themselves
//import {plus} from 'react-icons-kit/feather/plus'
import {edit2} from 'react-icons-kit/feather/edit2'
import {trash} from 'react-icons-kit/feather/trash'


// getting todos from local storage
const getTodosFromLS=()=>{
    const data = localStorage.getItem('Todos');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

export const Form = () => {

    // todo value state
    const [todoValue, setTodoValue]=useState('');
    const [todoCat, setTodoCat]=useState('');
    const [todoDead, setTodoDead]=useState('');

    // todos array of objects
    const [todos, setTodos]=useState(getTodosFromLS());
    // console.log(todos);

    // form submit event
    const handleSubmit=(e)=>{
        e.preventDefault();

        // creating a unique ID for every todo
        const date = new Date();
        const time = date.getTime();
        // end of creating a ID

        // creating a todo object
        let todoObject={
          ID: time,
          TodoValue:todoValue,
          TodoCat:todoCat,
          TodoDead:todoDead,
          completed: false
        }
        // end of creating a todo object
        setTodos([...todos,todoObject]);
        setTodoValue('');
        setTodoCat('');
        setTodoDead('');
    }

    // saving data to local storage
    useEffect(() => {
        localStorage.setItem('Todos',JSON.stringify(todos));
    }, [todos])

    // delete todo
    const handleDelete=(id)=>{
      // console.log(id);
      const filtered = todos.filter((todo)=>{
        return todo.ID!==id
      });
      setTodos(filtered);
    }

    // edit form
    const [editForm, setEditForm]=useState(false);

    // id state
    const [id,setId]=useState();

    // edit todo
    const handleEdit=(todo,index)=>{
      setEditForm(true);
      setTodoValue(todo.TodoValue);
      setTodoCat(todo.TodoCat);
      setTodoDead(todo.TodoDead);
      setId(index);
    }

    // edit todo submit
    const handleEditSubmit=(e)=>{
      e.preventDefault();
      // copying todos state in items variable
      let items = [...todos];
      // storing the element at a particular index in item variable
      let item = items[id];
      // manipulating the item (object) keys
      item.TodoValue=todoValue;
      item.TodoCat=todoCat;
      item.TodoDead=todoDead;
      item.completed=false;
      // after manipulating item, saving it at the same index in items
      items[id]=item;
      // updating todos with items
      setTodos(items);
      setEditForm(false);
      setTodoValue('');
      setTodoCat('');
      setTodoDead('');
    }
   
    // handle checkbox
    const handleCheckbox=(id)=>{
      let todoArray=[];
      todos.forEach((todo)=>{
        if(todo.ID===id){
          if(todo.completed===false){
            todo.completed=true;
          }
          else if(todo.completed===true){
            todo.completed=false;
          }
        }
        todoArray.push(todo);
        // console.log(todoArray);
        setTodos(todoArray);
      })
    }

    return (
        <>

          {/* form component */}
          {editForm===false&&(
            <div className="form" >
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='text' placeholder="Enter The Task Name" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  
                  
                </div><br></br>
                <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='text' placeholder="Enter the Category of Task like Personal, Work etc." required
                  onChange={(e)=>setTodoCat(e.target.value)} value={todoCat}/>
                  
                  
                </div><br></br>
                <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='date' placeholder="Deadline" required
                  onChange={(e)=>setTodoDead(e.target.value)} value={todoDead}/>
                  
                 
                </div><br></br>
                <div className='button'>
                    <button type="submit" className='add'>Add Task
                     
                    </button>
                  </div>

              </form>
            </div>
          )}
          {/* end of form component */}

          {/* edit form component */}
          {editForm===true&&(
            <div className="form" >
              <form autoComplete="off" onSubmit={handleEditSubmit}>
              <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='text' placeholder="Enter The Task Name" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  
                  
                </div><br></br>
                <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='text' placeholder="Edit Category" required
                  onChange={(e)=>setTodoCat(e.target.value)} value={todoCat}/>
                  
                  
                </div><br></br>
                <div className="input-and-button" style={{border:"2px solid black"}}>
                  <input type='date' placeholder=" Edit Deadline" required
                  onChange={(e)=>setTodoDead(e.target.value)} value={todoDead}/>
                  
                 
                </div><br></br>
                <div className='button'>
                    <button type="submit" className='add'>Update
                     
                    </button>
                  </div>
              </form>
            </div>
          )}
          {/* end of edit form component */}

          {/* start of rendering todos depending on
          if we have length of todos greater than 0 */}
          {todos.length>0&&(
            <>
              {todos.map((individualTodo,index)=>(
                <div className='todo' key={individualTodo.ID}>

                    
                  <div>
                      {/* we dont need to show checkbox when edit
                      button is clicked */}
                      {editForm===false&&(
                        <input type='checkbox' checked={individualTodo.completed} style={{width:'20px',height:'18px'}}
                        onChange={()=>handleCheckbox(individualTodo.ID)}/>
                      )}
                      <span
                      style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>{individualTodo.TodoValue}</span>
                  </div>
                  <div>
                  <span
                      >{individualTodo.TodoCat}</span>
                  </div>
                  <div>
                  <span
                      >{individualTodo.TodoDead}</span>
                  </div>

                  {/* we dont need to show edit and delete icons when edit
                  button is clicked */}
                  {editForm===false&&(
                    <div className='edit-and-delete'>
                      <div style={{marginRight:7+'px'}}
                      onClick={()=>handleEdit(individualTodo,index)}>
                          <Icon icon={edit2} size={25}/>
                      </div>
                      <div onClick={()=>handleDelete(individualTodo.ID)}>
                          <Icon icon={trash} size={25}/>
                      </div>
                    </div>
                  )}

                </div>
              ))} 

              {/* delete all todos */}
              {editForm===false&&(
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button className='delete-all' style={{backgroundColor:"#f92c0f", color:'white'}}
                  onClick={()=>setTodos([])}>Delete All Tasks</button>
                </div>
              )}
            </>
          )}
          {/* end of rendering todos depending on
          if we have length of todos greater than 0 */}

        </>
    )
}