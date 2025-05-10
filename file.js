const  usersContainer=document.getElementById("container-users")
  async function onFetchUserClick() {
    const response=await fetch("http://localhost:3000/users")
    const userList= await response.json()

    usersContainer.innerHTML=userList.map(
        user=>`<div class="bg-light rounded mt-5"> <h3>${user.title}</h3>
        <p>${user.email}</P>
        <p>${user.phoneNum}</p>
        <p>${user.id}</p>
        </div>`
    ).join("");

 
  }   
 
  let lastUserCreated=null

    async function onCreatUserClick(){
       
       // const testUser={title:"vero", userId:2,email:"veroniadimyan21@gmail.com",emailId:2}
        let newUserName = document.getElementById("name").value
        let newUserEmail = document.getElementById("email").value
        let newUserNmber=document.getElementById("phoneNum").value
        let newUser = {
            "title": newUserName,
            "email": newUserEmail,
            "phoneNum":newUserNmber,
        }
        const response= await fetch('http://localhost:3000/users/',{
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        const newlyCreatedUser= await response.json();
        lastUserCreated= newlyCreatedUser;
        
    }
   
    // async function onUpdateUserClick(userId){
    //     let newUserNameUpdated=document.getElementById("name").value;
    //     let newUserEmailUpdated=document.getElementById("email").value;
    //     let newUserNambrUpated=document.getElementById("phoneNum").value;
    
    
    //     const newUserUpated={
    
    //         "title": newUserNameUpdated,
    //         "email": newUserEmailUpdated,
    //         "phoneNum":newUserNambrUpated,
    
    //     };
    //      const response = await  fetch('http://localhost:3000/users/' + userId,{
    //         method: "PUT",
    //         headers: {
    //             'content-type' : 'application/json'
    //         },
    //         body: JSON.stringify(newUserUpated)
    //     });
    //     if(response.ok){
    //         console.log('user updated successfully');
    //         onFetchUserClick();
    //     }else{
    //         console.log('failed to update ')
    //     }
    //     document.getElementById("btnUpdate").addEventListener("click", function() {
    //         const userId = this.dataset.userId;  // Assuming you set a `data-user-id` attribute in your button
    //         onUpdateUserClick(userId);
    //     });
    //     onFetchUserClick();
    // }
    // // document.getElementById("btnUpdate").addEventListener("click", function() {
    // //     const userId = this.dataset.userId;  // Assuming you set a `data-user-id` attribute in your button
    // //     onUpdateUserClick(userId);
    // // });
    async function onDeleteUserClick(){
        if(lastUserCreated){ 
        const response= await fetch('http://localhost:3000/users/'+ lastUserCreated.id,{
            method:"DELETE",  
            headers: {
                'content-type' : 'application/json'
            },
            body:JSON.stringify()
            
        });
            if(response.ok){
                console.log('user deletes successfully');
                // lastUserCreated=null;
                onFetchUserClick();
            }else {
                console.log('failed to delet user')
            }
        }else{
            console.log('no user to delete')
        }
        onFetchUserClick();

    }

    document.getElementById("btnDelete").addEventListener("click" ,onDeleteUserClick);
    // document.getElementById("btnUpdate").addEventListener("click" ,onUpdateUserClick);
    onFetchUserClick();
