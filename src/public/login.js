$(function(){
    let fnbx=$("#fnbx");    let lnbx=$("#lnbx");
    let embx=$("#embx");    let reembx=$("#reembx");
    let psbx=$("#psbx");    let gb=$("#gb");
    let mb=$("#mb");        let db=$("#db");    let yb=$("#yb");
    let subtn=$("#subtn");  let lgnbtn=$("#lgnbtn");

    lgnbtn.click()
    
    subtn.click(
        function()
        {
            let dobstr=db.val()+"/"+mb.val()+"/"+yb.val();
            $.post
            (
                '/signup/',
                { fn:fnbx.val(), ln:lnbx.val(), em:embx.val(), reem:reembx.val(), 
                  ps:psbx.val(), gen:gb.val()},
                function(data)
                {  }
            )
        }    
    )
})