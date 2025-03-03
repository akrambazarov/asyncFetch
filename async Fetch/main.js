const API = "https://67bebb90b2320ee0501120c8.mockapi.io/api/v1/users";
let dark = document.querySelector('.input-dark-mode');
let table = document.querySelector('.table-users-info');
let btnAdd = document.querySelector('.button-6');
let addModal = document.querySelector('.add');
let editModal = document.querySelector('.Edit');
let search = document.querySelector('.input');
dark.onclick = ()=>{
    if (dark.checked) {
        darkMode();
        
    }else{
        lightMode();
        
    }
}
if (localStorage.getItem('theme') === 'dark'){dark.checked = true;darkMode()}
if (localStorage.getItem('theme') === 'light'){dark.checked = false;lightMode();}
function darkMode(){
    localStorage.setItem('theme','dark');
    document.body.classList.add('dark');
    document.querySelector('.button-6').classList.add('btn-dark');
    document.querySelector('.input').classList.add('btn-dark');
    addModal.classList.add('btn-dark');
    editModal.classList.add('btn-dark');
}
function lightMode() {
    localStorage.removeItem('dark');
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');
    document.querySelector('.button-6').classList.remove('btn-dark');
    document.querySelector('.input').classList.remove('btn-dark');
    addModal.classList.remove('btn-dark');
    editModal.classList.remove('btn-dark');
}
async function get() {
    try {
        let responsive = await fetch(API);
        let data = await responsive.json();
        getData(data);
        let copyUsers = [...data]
        search.oninput = ()=>{
            searchUsers(data,copyUsers)
        }
        
    } catch (error) {
        console.error(error);
        
    }
}
get();

//Status Check
async function statusCheck(element) {
try {
    let response = await fetch(`${API}/${element.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            status:!element.status
        })
    });
    get();

} catch (error) {
    console.error(error);
    
}
}
//edit Users
let idx = null;
async function editUsers(id) {
try {
    let responsive = await fetch(`${API}/${idx}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:document.querySelector('.edit-name').value,
            active:document.querySelector('.edit-lastname').value,
            email:document.querySelector('.edit-email').value
        }),
    })
    editModal.close();
    get();
} catch (error) {
    console.error(error);
    
}
}
//Delete Users
async function deleteUser(params) {
    try {
        let response = await fetch(`${API}/${params.id}`,{
            method: "DELETE",
            headers:{"Content-Type":"application/json"},
        })
        get();
    } catch (error) {
        console.error(error);
        
    }
    
}
let form = document.querySelector('.form');
//add User
document.querySelector('.submit').onclick = async (event)=>{
    event.preventDefault();
    try {
        await fetch (API,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:form["firstname"].value,
                active: form["lastname"].value,
                email:form["email"].value
            })
           
        })
        get();
        addModal.close();
    } catch (error) {
        console.error(error);
        
    }
}
//Search Users
function searchUsers(data,copyUsers){
    let finds = search.value.toLowerCase();
if(search.value !== ""){
    data = copyUsers.filter((e)=>{
        let res = e.name.toLowerCase().includes(finds);
        return res;
     })
    
}
else{
    data = [...copyUsers];
    
   //getDate(data);
}
    getData(data)
}
function getData(users) {
    table.innerHTML = "";
    users.forEach(element => {
        let usersInfo = document.createElement('div');
        let iconsDiv = document.createElement('div');

        iconsDiv.classList.add('icons');        
        usersInfo.classList.add('users-info');
        usersInfo.innerHTML = `
        <div class="user-id">
        <p>${element.id}</p>
        </div>
        <div class="user-txt">
        <span>${element.email}</span>
        </div>
        <div class="user-city"><p>${element.name}</p></div>
        <div class="user-status"><p aria-valuetext="${element.active}">${element.active}</p></div> 
        `;
        let about = document.createElement('div');
        about.classList.add('us-chck');
        
        let title = document.createElement('div');
        title.classList.add('us-title');
        
        let editBtn = document.createElement('div');
        editBtn.classList.add('us-edit');
        
        let labBookmart = document.createElement('label');
        labBookmart.classList.add('ui-bookmark');
        let inpCheck = document.createElement('input');
        inpCheck.type = 'checkbox';
        inpCheck.checked = element.status;
        let bookmart = document.createElement('div');
        bookmart.classList.add('bookmark');

        let delBtn = document.createElement('div');
        delBtn.classList.add('us-del');
        about.innerHTML = `
        <button class="faq-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
        d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
        ></path>
        </svg>
        <span class="tooltip">${element.email}</span>
        </button>
        `;

        bookmart.innerHTML = `
            <svg viewBox="0 0 32 32">
            <g>
                <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
            </g>
            </svg>
        `;

        //title.checked = element.status;
        editBtn.innerHTML = `<i class="fa fa-pencil">`;
        delBtn.innerHTML = `<i class="fa fa-trash-o"></i>`;
        table.append(usersInfo);
        usersInfo.append(iconsDiv);
        iconsDiv.append(about,title,editBtn,delBtn);
        title.append(labBookmart);
        labBookmart.append(inpCheck,bookmart);

        if(element.status === true){
            usersInfo.children[1].classList.toggle('done');
            usersInfo.children[2].classList.toggle('done');
            //console.log(usersInfo.children);
            
        }
        
        title.onchange = ()=>{
            statusCheck(element);
        };
        document.querySelector('.edit-submit').onclick = ()=>{
            editUsers(element.id);
        }
        editBtn.onclick =()=>{
            editModal.showModal();
            document.querySelector('.edit-name').value = element.name;
            document.querySelector('.edit-lastname').value = element.active;
            document.querySelector('.edit-email').value = element.email;
            idx = element.id
        }
        delBtn.onclick = ()=>{
            deleteUser(element);
        }


    });
}


btnAdd.onclick =()=>{
    addModal.showModal();
    if (form["firstname"].value == "" || form['lastname'] == "" ||form['email'].value == "") {
        document.querySelector('.submit').setAttribute('disabled','');
        document.querySelector('.submit').style.background = '#147';
        
    } else {
        document.querySelector('.submit').removeAttribute('disabled','');
        document.querySelector('.submit').style.background = '#08d';
    }
}

function closeModal(){
    document.querySelectorAll('dialog').forEach((e)=>{
        e.close();
    });
}
form["firstname"].oninput = ()=>{
    if (form["firstname"].value != "") {
        document.querySelector('.submit').removeAttribute('disabled','');
        document.querySelector('.submit').style.background = '#08d';
}
else{
    document.querySelector('.submit').setAttribute('disabled','');
    document.querySelector('.submit').style.background = '#147';
}
}
form["lastname"].oninput = ()=>{
    if (form["lastname"].value != "") {
        document.querySelector('.submit').removeAttribute('disabled','');
        document.querySelector('.submit').style.background = '#08d';
}
else{
    document.querySelector('.submit').setAttribute('disabled','');
    document.querySelector('.submit').style.background = '#147';
}
}
form["email"].oninput = ()=>{
    if (form["email"].value != "") {
        document.querySelector('.submit').removeAttribute('disabled','');
        document.querySelector('.submit').style.background = '#08d';
}
else{
    document.querySelector('.submit').setAttribute('disabled','');
    document.querySelector('.submit').style.background = '#147';
}
}
