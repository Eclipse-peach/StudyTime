 // MDB Lightbox Init
 $(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

// Adding animations to the sections
$("section").addClass("wow fadeIn");

// Animations Init
new WOW().init();

$(document).ready(function () {
    //   if(checkl == 1){
    //     profileload();
    //   }
    
    let intervalId = null;
    let timerclock = document.getElementById("timerclock");
    let formatseconds = "0";
    let formatminute = "0";
    let formattime = "0";
    let plag = false;
    $('#start-btn').click(() => {
      if(plag == false){
      intervalId = setInterval(startTimer, 1000);
      plag = true;
      }
    });
    
    $('#stop-btn').click(() => {
      if (intervalId)
        clearInterval(intervalId);
        plag = false;
    });
    
     
    $('#reset-btn').click(()=>{
      if (intervalId)
        clearInterval(intervalId);
         if(localStorage.getItem('time')==null) localStorage.setItem('time',totalSeconds);
         else localStorage.setItem('time', parseInt(localStorage.getItem('time'))+parseInt(totalSeconds));
         var obj = JSON.parse(localStorage.getItem('time'));
         
      plag = false;
        axios.post('/timer', {
          time : totalSeconds
        })
        
        .then(({data})=>{
        totalSeconds=0;
      timerclock.innerHTML = "00:00:00";
        });
    
    });
})