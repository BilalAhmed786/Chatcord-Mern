const users=[]

function singleUser(id,name,room){

const user= {id,name,room}

users.push(user)

return user

}

function getUser(id){

    return users.find(user=>user.id===id)
}

// remove user from an array
function userLeave(id){

  const index =  users.findIndex(user=>user.id===id)

if(index !== -1){

    return users.splice(index,1)[0]  //give me rmove user

}

}
//get users from a particular room

function roomUsers(room){

    return users.filter(user=>user.room===room)
}






module.exports= {singleUser,getUser,userLeave,roomUsers}