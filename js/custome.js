var server;
$(function(){
	server = "http://localhost:2800/ambica/";
	connect();
$("#srleft").load(server+"srsidebar.php");
$("#dbleft").load(server+"dbsidebar.php");
if(localStorage.getItem("Role") == 'SR'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
if(localStorage.getItem("User") == 'SO'){
    
}
if(localStorage.getItem("User") == 'ASO'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
if(localStorage.getItem("Role") == 'Distributor'){
    $("#uname").html(localStorage.getItem("User_Name"));
}

	$("#login").on("submit", function(e){
    e.preventDefault();
    var fdata = $("#login").serialize();
    $.ajax({
       url:server+"login.php",
       data:fdata,
       type:"post",
       beforeSend:function(){
        $("#preloader").show();
        $("#emsg").hide();
       },
       success: function(str){
       console.log(str);
       $("#preloader").hide();

       if(str.Status == 'Active'){
        if(str.Role== 'SR'){
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("Userid",str.Userid);
        localStorage.setItem("Emp_Code",str.Empcode);
        localStorage.setItem("User_Name",str.Username);
        location.href="Screen_SR.html";
         }

        if(str.Role == 'SO'){
        localStorage.setItem("Role",'SM');
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Emp_Code);
        localStorage.setItem("User_Name",str.User_Name);
        location.href="Screen_SM.html";
         }

        if(str.Role == 'ASO'){
        localStorage.setItem("Role",'DB');
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Customer_Code",str.Customer_Id);
        localStorage.setItem("User_Name",str.Customer_Name);
        location.href="Screen_DB.html";
         }

         if(str.Role == 'Distributor'){
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("User",str.Userid);
        localStorage.setItem("Customer_Code",str.Userid);
        localStorage.setItem("User_Name",str.Username);
        location.href="Screen_DB.html";
         }

       }else{
         $("#emsg").show();
         $("#emsg").html(str.Status);
         $("#login")[0].reset();
       }
       }
    });
});




});
function connect(){
	$.ajax({
		url:server+"connect.php",
		beforeSend:function(){

		},
		success: function(str){
			$("#imsg").hide();
		},
		error: function(){
			$("#imsg").show();
		}
	});
}

function showProducts(igroup){
        var fdata = {"Group_Id":igroup};
        $.ajax({
           url:server+"getItems.php",
           type:"POST",
           data:fdata,
           beforeSend:function(str){
             $("#ploader").show();
           },
           success: function(data){
             var toAppend='';
             $("#product").empty();
            if(data.length > 0){
              $("#ploader").hide();
             $.each(data,function(i,o){
               $("#sdata").show();
					toAppend += '<option value="'+o.Item_Code+'">'+o.Item_Name+'</option>';
                    });
                    $("#product").append(toAppend);
            }else{
            	$("#ploader").hide();
            	$("#product").empty();
            }
           }
        });
    }

function doOperation(data){
      var fdata = {"Item_Code":data,"Dcode":$("#dis").val()};
      $.ajax({
         url:server+"getItemData.php",
         data:fdata,
         type:"post",
         success: function(str){
           console.log(str);
           $("#itemname").val(str.Item_Name);
           $("#qtyunits").val(str.No_Of_Unit_Per_Case);
           $("#qtypacks").val(str.No_Of_Packs);
           $("#price").val(str.Price);
           $("#weight").val(str.Weight);
           $("#actualqty").val(str.No_Of_Unit_Per_Case);
           $("#perbox").val(str.Uom_Per_EachUnit);
           $("#qtycases").val(str.Uom_Per_EachUnit);
           $("#taxrate").val(str.Taxrate);
           $("#itemcode").val(data);
         }
      });

    }

 function doOperationDB(data){
      var fdata = {"Item_Code":data,"Dcode":localStorage.getItem("User")};
      $.ajax({
         url:server+"getItemData.php",
         data:fdata,
         type:"post",
         success: function(str){
           console.log(str);
           $("#itemname").val(str.Item_Name);
           $("#qtyunits").val(str.No_Of_Unit_Per_Case);
           $("#qtypacks").val(str.No_Of_Packs);
           $("#price").val(str.Price);
           $("#weight").val(str.Weight);
           $("#actualqty").val(str.No_Of_Unit_Per_Case);
           $("#perbox").val(str.Uom_Per_EachUnit);
           $("#qtycases").val(str.Uom_Per_EachUnit);
           $("#taxrate").val(str.Taxrate);
           $("#itemcode").val(data);
         }
      });

    }

function logout(){
localStorage.removeItem("Role");
localStorage.removeItem("Userid");
localStorage.removeItem("Emp_Code");
localStorage.removeItem("User_Name");
location.href="index.html";
}