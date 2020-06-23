var serverURL="http://restclass.azurewebsites.net/API2/Todos";
var todos = [];

function addToDo(){
    console.log("Adding a new task");
    // get the value from input
    // var text=document.getElementById("txt-task").value;
    var text=$("#txt-task").val();  //jQuery version of previous line
    var todo={
        text:text,
        user:"Jonathan",
        state:0 // new
    };

    if (text!="") {
    console.log(text);
        $("#txt-task").val("");// clear the input
      
    $.ajax({
        url:serverURL,
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(todo),
        success: function (res){
            console.log(res);
        },
        error: function(error){
            console.error("Error saving", error);
        }
    });
    //display
    displayToDo(todo);
}else{
    alert("You have to enter a task")
}
 // set the focus to the input
$("#txt-task").focus();
// send the object to backend
}

// function deleteToDo(id){
//     console.log("delete function is working"+id);
//     $("#"+id).remove();
// }
function displayToDo(todo) {

    if (todo.state==0) {
           // create the list item template
        var li=`<li id="${todo.id}">${todo.text} <button onclick=markDone(${todo.id})> Done </button></li>`;
        // display the li under the ul
        $("#pending-list").append(li); 
    }
    else{
        var li2=`<li> ${todo.text} </li>`;
        $("#doneTodos").append(li2);
    }
}

function markDone(id) {
    console.log("Item Done",id);
    $("#"+id).remove();

    // find on the todos array the one with the id=id
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].id==id) {
            todos[index].state=1;
            displayToDo(todos[index]);
        }
        
    }

}

function loadData() {
    // load data from backend (GET)
    // display todos
    $.ajax({
        type: "GET",
        url:serverURL,
        success: function (response) {
            console.log("server responded");
            for (let index = 0; index < response.length; index++) {
                if (response[index].user == "Jonathan") { //if for "J" only
                    console.log("This item is mine");
                    
                    todos.push(response[index]);
                    displayToDo(response[index]);
                }
            }
        },
        error: function (error) {
            console.error("Error getting data", error);
        }
    });

}

function init(){
    console.log("Init the to do app");
    // sensing the user actions/events
    // document.getElementById("btn-add");
    $("#btn-add").click(addToDo);

    $("#txt-task").keypress(function(e){
        // console.log(e.key);              //logs the key pressed
        if (e.key==="Enter") {
            console.log("Add a new task");
            addToDo();
        }
    });

    loadData();
}

// when the browser finishes rendering the HTML, EXECUTE INIT
window.onload=init;