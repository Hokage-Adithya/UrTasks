import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  
    
  }, [])
  
  

  const savetodos = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleShowFinished = (e) => {
    setshowFinished(!showFinished);

  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetodos();
    // This is another way to edit the todo
    // let newTodos = [...todos];
    // let newTodo = prompt("Edit your task", newTodos[index].todo);
    // if (newTodo) {
    //   newTodos[index].todo = newTodo;
    //   setTodos(newTodos);
    // }
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // return false;


  }
  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => item.id === id);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetodos();

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetodos();

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetodos();
  }



  return (
    <>


      <Navbar />
      <div className="container mx-auto my-5 p-5 bg-amber-500 rounded-2xl shadow-lg min-h-screen">
        <div className="welcome flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black">Welcome to UrTasks</h1>
          <p className="text-black mt-2 font-bold">Your one-stop solution for task management and collaboration.</p>
        </div>
        <div className="addtask display flex flex-col items-center my-5">
          <h3 className="text-2xl font-bold text-black">Add a New Task</h3>
          <input onChange={handleChange} value={todo} type="text" placeholder="Task Name" className="p-2 rounded-lg w-full mt-2 bg-black text-amber-50" />
          <button onClick={handleAdd} disabled={todo.length<1} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer w-1/4">Add Task</button>
        </div>
        <input onChange={toggleShowFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className="h-[1px] bg-black opacity-200 w-full mx-auto my-2"></div>
        <h2 className="text-lg font-bold my-3">Tasks to complete</h2>
        <div className="todos">
          {todos.length === 0 && <p className="text-black">No tasks available. Please add a task.</p>}
          {todos.map(item => {
            return(showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between ">
              <div className="flex gap-15 items-center">
                <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>
              <div className="buttons flex gap-2 items-center">
                <button onClick={(e)=> { handleEdit(e, item.id) }} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer mx-1"><FaUserEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-black text-white p-2 rounded-lg mt-2 hover:bg-gray-800 cursor-pointer mx-1"><RiDeleteBinFill /></button>

              </div>

            </div>
          })}
        </div>





      </div>









    </>
  )
}

export default App
