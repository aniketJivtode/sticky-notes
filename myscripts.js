
if ("serviceWorker" in navigator) {
  // register service worker
     navigator.serviceWorker.register("service-worker.js");
   }
   


count = Number(window.localStorage.getItem('count'));

if(!count){
  window.localStorage.setItem('count',0);
}


function inputFormSubmit(e){
  e.preventDefault();
  
  //Get text from form inputs
  title = document.getElementById('new-note-title-input').value;
  body = document.getElementById('new-note-body-input').value;


  while(window.localStorage.getItem(title)){
    title += '- 1';
  }

  //Add note data in local storage

  window.localStorage.setItem(title,body);
count++;
  window.localStorage.setItem('count',count);

  

  //function to create a new node
  createNode(title,body);

}


function createNode(title,body){


//remove no notes found message
document.getElementById('no-notes').setAttribute('class','hidden');


  //Create html element for Note Card
  li = document.createElement('li');
  a = document.createElement('a');
  h2 = document.createElement('h2');
  deletebutton = document.createElement('button');
  p = document.createElement('p');

  //Create text nodes to show on notes card
  xButton = document.createTextNode('X');
  titleText = document.createTextNode(title);
  titleBody = document.createTextNode(body);

  //Empty input fields only submit button is clicked
  document.getElementById('new-note-title-input').value = '';
  document.getElementById('new-note-body-input').value = '';


//set Attributes
a.setAttribute('href','#');
deletebutton.setAttribute('class','delete');



//append element to in specific hirarchy
deletebutton.appendChild(xButton);
p.appendChild(titleText);
h2.appendChild(titleBody);

a.appendChild(p);
a.appendChild(deletebutton);
a.appendChild(h2);

li.appendChild(a);
document.getElementById('notes').appendChild(li);

}

function removeItem(e){
  if(e.target.classList.contains("delete")){
    if(confirm("Are sure to delete ?")){
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("notes");
      ul.removeChild(li);
    }
  }
  window.localStorage.removeItem(e.target.previousElementSibling.innerText);
  count --;
  window.localStorage.setItem('count',count);
  if(count < 1) {
    document.getElementById('no-notes').setAttribute('class','');
  }
}


for (let i = 0; i < count+1 ; i++){
  notetitle = window.localStorage.key(i);
  noteBody  = window.localStorage.getItem(notetitle);
  
  if(notetitle !== 'count' && notetitle){
    createNode(notetitle,noteBody);
  }
  
}

document.getElementById("inputForm").addEventListener("submit",inputFormSubmit,false);

document.getElementById("notes").addEventListener('click',removeItem,false);







// 

// var itemList = document.getElementById("notes");

// itemList.addEventListener("click", removeItem);

// let count = Number(window.localStorage.getItem("count"));
// if (!count) {
//   window.localStorage.setItem("count", "0");
// }

// console.log(count);

// let createNote = (noteTitle, noteBody) => {
//   if (count > 0) {
//     document.getElementById("no-notes").className = "hidden";
//   }

//   var li = document.createElement("li");
//   var a = document.createElement("a");
//   var h2 = document.createElement("h2");
//   var p = document.createElement("p");
//   var ul = document.getElementById("notes");

//   let xButton = document.createElement("button");
//   xButton.classList.add("delete");
//   let xText = document.createTextNode("X");
//   let h2TN = document.createTextNode(noteTitle);
//   let pTN = document.createTextNode(noteBody);

//   h2.appendChild(h2TN);
//   p.appendChild(pTN);
//   xButton.appendChild(xText);

//   a.appendChild(h2);
//   a.appendChild(xButton);
//   a.appendChild(p);
//   a.setAttribute("href", "#");

//   li.appendChild(a);
//   ul.appendChild(li);
// };

// let createNoteFromInput = (e) => {
//   e.preventDefault();
//   var noteTitle = document.getElementById("new-note-title-input").value;
//   var noteBody = document.getElementById("new-note-body-input").value;

//   document.getElementById("new-note-title-input").value = "";
//   document.getElementById("new-note-body-input").value = "";

//   console.log("yes");
//   if (!noteTitle || !noteBody) {
//     alert("Both Title and body of the note must be provided");
//     return;
//   }
//   count += 1;
//   window.localStorage.setItem("count", count);

//   while (window.localStorage.getItem(noteTitle)) {
//     noteTitle = noteTitle + " - 1";
//   }
//   window.localStorage.setItem(noteTitle, noteBody);

//   createNote(noteTitle, noteBody);
// };

// function removeItem(e) {
//   //console.log('2');
//   if (e.target.classList.contains("delete")) {
//     console.log(e);
//     if (
//       confirm(
//         'Are you sure to delete the "' +
//           e.target.previousElementSibling.innerText +
//           '" note?'
//       )
//     ) {
//       //grab the parent
//       // console.log(e.target.previousSibling.data);
//       var li = e.target.parentElement.parentElement;

//       itemList.removeChild(li);
//       count -= 1;
//       window.localStorage.setItem("count", count);
//       window.localStorage.removeItem(e.target.previousElementSibling.innerText);
//       if (count < 1) {
//         document.getElementById("no-notes").className = "";
//       }
//     }
//   }
// }

// for (i = 0; i < count + 1; i++) {
//   console.log(window.localStorage.key(i));
//   let noteTitle = window.localStorage.key(i);
//   let noteBody = window.localStorage.getItem(noteTitle);
//   if (noteTitle !== "count" && noteTitle) {
//     createNote(noteTitle, noteBody);
//   }
// }

// document
//   .getElementById("inputForm")
//   .addEventListener("submit", createNoteFromInput, false);
