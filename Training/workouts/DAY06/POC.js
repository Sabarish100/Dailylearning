
//addEventListener is it a function
//addEventListner are 

    // registering for the Event
    document.addEventListener("DOMContentLoaded",()=>{
               
    const y = document.getElementById('num');
    const x = document.getElementById("t1");
    x.addEventListener("change",()=>{
        
            console.log(parseInt(x.value)+1);
    });
    y.addEventListener("click",()=>{
        console.log(y);
    })
    
});
