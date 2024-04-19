import { useEffect, useState, useRef, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';





export default function Chat() {

    const [queryitem, statequeryparam] = useSearchParams([]);

    const name = queryitem.get('username')  //get username and room from url

    const room = queryitem.get('room')

    const scrollableDivRef = useRef(null);  //last chat message focus

    // const [message, setwelcome] = useState([])

    // const [chat, setChat] = useState('')

    // const [setsocket, stateforfunc] = useState('')

    // const [Roomuser, stateroomUser] = useState([])

function reducer(state,action){

switch(action.type){
    
    case 'message':

    return{
        ...state,message:[...state.message,action.payload]
    }

    case 'socketchange':

    return {...state,statechange:action.payload}

    case 'roomusers':

    return {...state,roomusers:action.payload}
    case 'chat':

    return {...state,chat:action.payload}

    default:
    return state

    }
}

const[state,dispatch] = useReducer(reducer,{
message:[],
statechange:'',
roomusers:[],
chat:''

})

console.log(state.message)

    useEffect(() => {

        const socket = io.connect('http://localhost:5000');


        socket.emit('join-room', { name, room })


        socket.on('message', (server) => {


           // setwelcome(prevMessages => [...prevMessages, server]);

           dispatch({type:'message',payload:server})
        })

        // stateforfunc(socket)   //use socket outside use effect

        dispatch({type:'socketchange',payload:socket})


        // All user from specific room
        socket.on('specificuser', ({room,users}) => {

          
            // stateroomUser(users)

            dispatch({type:'roomusers',payload:users})
            
            

        })

    }, [])




    const chatForm = (e) => {

        e.preventDefault()

        e.target.reset();


        if (state.statechange) {
            state.statechange.emit("chatmessage", state.chat)
        }



        // Scroll to the bottom of the scrollable div 

        //last chat message focus

        if (scrollableDivRef.current) {

            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }



    }

    return (
        <div>
            <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> ChatCord</h1>
                    <a href='http://localhost:3000/' id="leave-btn" className="btn">Leave Room</a>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">

                        <h3><i className="fas fa-comments"></i> Users:</h3>
                        {state.roomusers.map((roomuser, index) => (



                            <h4 style={{ fontSize: 15, padding: 3, color: 'lightgreen' }} key={index} id="room-name">

                                {roomuser.name}
                                
                            </h4>

                        ))}
                        <h3><i className="fas fa-users"></i>Room : {room}</h3>
                        <ul id="users"></ul>
                    </div>
                    <div ref={scrollableDivRef} className="chat-messages">
                        <div className='messages'>
                            {state.message.map((message, index) => (
                                <div className='messagecotain' key={index}>
                                    <p className='meta'>{message.name} <span>{message.time}</span></p>
                                    <p className='text'>{message.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
                <div className="chat-form-container">
                    <form onSubmit={chatForm} id="chat-form">
                        <input
                            id="msg"
                            type="text"
                            onChange={(e) => dispatch({type:"chat",payload:e.target.value})}
                            placeholder="Enter Message"
                            required
                            autocomplete="off"
                        />
                        <button className="btn" ><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
            </div>


        </div>
    )
}
