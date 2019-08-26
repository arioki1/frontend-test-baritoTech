import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Todos extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos:[
                {id:0, todo:'Mencari Lowongan Pekerjaan', category:'Study', finish:false},
                {id:1, todo:'Mengerjakan Test Barito Tech', category:'Study', finish:false},
                {id:2, todo:'Mencari Uang dengan Halal', category:'Work', finish:false},
                {id:3, todo:'Mengerjakan Client Project', category:'Work', finish:true},
                {id:4, todo:'Pergi Memancing', category:'Lifestyle', finish:true},
                {id:5, todo:'Mempelajari Angular', category:'Technology', finish:true},
                {id:6, todo:'Mempelajari React', category:'Technology', finish:false},
            ],
            category:[
                {id:0, name:'Study'},
                {id:1, name:'Work'},
                {id:2, name:'Lifestyle'},
                {id:3, name:'Technology'},
            ],
            newTodo:'',
            newCategory:'',
            heightScreen:window.innerHeight,
            widthScreen:window.innerWidth,
        }
    }
    componentDidMount(){
        window.addEventListener('resize', this.updateWindowDimensions)
    }
    componentWillUnmount(){
        window.addEventListener('resize', this.updateWindowDimensions)
    }
    updateWindowDimensions = () =>{
        this.setState({widthScreen:window.innerWidth, heightScreen:window.innerHeight})
    }
    drag = (e,id) =>{
        e.dataTransfer.setData('id',id)
    }
    drop = (e) =>{
        const {todos} = this.state
        const id = e.dataTransfer.getData('id')
        let newTodoList = []
        for(let i=0 ; i<todos.length ; i++){
            if(todos[i].id !== Number(id)){
                newTodoList.push({
                    id: todos[i].id,
                    todo: todos[i].todo,
                    category: todos[i].category,
                    finish: todos[i].finish
                })
            }
        }
        this.setState({
            todos: newTodoList
        })
    }
    allowDrop = (e) =>{
        e.preventDefault();
    }
    listItems = (category) =>{
        const {todos, newCategory} = this.state
        let todoList = []
        for(let i=0 ; i<todos.length ; i++){
            if(category.length>0){
                if(todos[i].category === newCategory){
                    todoList.push(
                        <div style={{width:'100%', margin:'auto', marginBottom:10, borderRadius:10}} className={todos[i].finish?"row p-3":"shadow row p-3"} key={i} onClick={()=>this.finishTodoHandler(todos[i].id)} draggable={true} onDragStart={(e)=>this.drag(e,todos[i].id)}>
                            <div className="col-2">
                                <FontAwesomeIcon icon={faCheck} style={{fontSize:30}} color={todos[i].finish?"green":"grey"} />
                            </div>
                            <div className="col" style={todos[i].finish?{color:'grey',textDecorationLine: 'line-through'}:{color:'black'}}>
                                {todos[i].todo}
                            </div>
                            <div className="col-2 btn d-flex align-items-center justify-content-center" style={todos[i].finish?{color:'white', backgroundColor:'#dfffdb'}:{color:'white', backgroundColor:'#57ba4a'}}>
                                {todos[i].category}
                            </div>
                        </div>
                    )
                }
            }
            else{
                todoList.push(
                    <div style={{width:'100%', margin:'auto', marginBottom:10, borderRadius:10}} className={todos[i].finish?"row p-3":"shadow row p-3"} key={i} onClick={()=>this.finishTodoHandler(todos[i].id)} draggable={true} onDragStart={(e)=>this.drag(e,todos[i].id)}>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faCheck} style={{fontSize:30}} color={todos[i].finish?"green":"grey"} />
                        </div>
                        <div className="col" style={todos[i].finish?{color:'grey',textDecorationLine: 'line-through'}:{color:'black'}}>
                            {todos[i].todo}
                        </div>
                        <div className="col-2 btn d-flex align-items-center justify-content-center" style={todos[i].finish?{color:'white', backgroundColor:'#dfffdb'}:{color:'white', backgroundColor:'#57ba4a'}}>
                            {todos[i].category}
                        </div>
                    </div>
                )
            }
        }
        return todoList
    }
    finishTodoHandler = (value) =>{
        const {todos} = this.state
        let newTodoList = []
        for(let i=0 ; i<todos.length ; i++){
            newTodoList.push({
                id: i,
                todo: todos[i].todo,
                category: todos[i].category,
                finish: todos[i].id === value ? !todos[i].finish : todos[i].finish
            })
        }
        this.setState({todos: newTodoList})
    }
    addTodo = () =>{
        const {newTodo, todos, newCategory} = this.state
        if(newTodo.length>0){
            let newTodoList = todos
            newTodoList.push({
                id: todos.length>0 ? todos[todos.length-1].id+1 : 0,
                todo: newTodo,
                category: newCategory.length>0 ? newCategory : 'study',
                finish: false
            })
            this.setState({todos:newTodoList, newTodo:''})
        }
        else{
            alert('input length must be more than 0')
        }
    }
    categoryList = () =>{
        const {category} = this.state
        let categoryList = []
        for(let i=0 ; i<category.length ; i++){
            categoryList.push(
                <button class="dropdown-item" key={category[i].id} onClick={()=>this.setState({newCategory: category[i].name})}>{category[i].name}</button>
            )
        }
        return categoryList
    }
    render(){
        const {heightScreen, newTodo, todos, newCategory} = this.state
        return(
            <div className="d-flex align-items-center justify-content-center bg-primary" style={{height:heightScreen}}>
                <div className="row bg-light p-3 shadow">
                    <div className="col">
                        <div className="d-flex flex-column">
                            <div>
                                <div className="input-group mb-3">

                                    <div class="dropdown mr-2">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {newCategory.length > 0 ? newCategory : 'Category'}
                                        </button>
                                        <div class="dropdown-menu mt-3" aria-labelledby="dropdownMenuButton">
                                            <button class="dropdown-item" onClick={()=>this.setState({newCategory: ''})}>(All)</button>
                                            {this.categoryList()}
                                        </div>
                                    </div>

                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Add Todo</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="I will .." onChange={(event)=>this.setState({newTodo:event.target.value})} value={newTodo} />
                                    <div className="input-group-append">
                                        <button className="input-group-text" onClick={()=>this.addTodo()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {todos.length>0 ? this.listItems(newCategory) : <span className="d-flex align-items-center justify-content-center">No data</span>}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 border rounded-lg d-flex align-items-center justify-content-center flex-column" style={{color:'grey', padding:40, width:500}} onDrop={this.drop} onDragOver={this.allowDrop}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{fontSize:100}} />
                        <span>Drag items to delete.</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Todos