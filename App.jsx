import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { useState } from 'react';
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  
  
  const handleEdit = ()=>{

  }
  const handleDelete = ()=>{

  }
  const handleAdd = ()=>{
    settodos([...todos, {todo, isCompoleted: false}])
    settodo("")
  
  }
  const handleChange = (e)=>{
    settodo(e.target.value)
  }
  
  
  return (
    <>
   
      
      <Navbar/>
      <div className="container mx-auto my-5 p-5 bg-amber-500 rounded-2xl shadow-lg min-h-screen">
        <div className="welcome flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black">Welcome to UrTasks</h1>
          <p className="text-black mt-2 font-bold">Your one-stop solution for task management and collaboration.</p>
        </div>
        <div className="addtask">
          <h3 className="text-2xl font-bold text-black">Add a New Task</h3>
          <input onChange={handleChange} value={todo} type="text" placeholder="Task Name" className="p-2 rounded-lg w-full mt-2 bg-black text-amber-50" />
          <button onClick={handleAdd} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer">Add Task</button>
        </div>
        <h2 className="text-lg font-bold my-3">Tasks to complete</h2>
        <div className="todos">
          {todos.map(item=>{
          return <div className="todo flex w-1/4 justify-between my-3">
            <input type="checkbox" value={todo.isCompleted} name="" id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="buttons">
              <button onClick={handleEdit} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer mx-1">Edit</button>
              <button onClick={handleDelete} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer mx-1">Delete</button>

            </div>
          
          </div>
          })}
        </div>
        
        

        
      
      </div>
   
        
          
        
      

    
      
        
    </>
  )
}

export default App
