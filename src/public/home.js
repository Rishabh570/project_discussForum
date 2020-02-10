$(function(){
    let lgnBtn=$("#lgnBtn");
  
    lgnBtn.click(
        function()
        {
                $.get(
                     '/signup',
                     function (data) {
                        console.log(2);}
                    )
        })
})