var server;
var currPosition;
alert.log(localStorage.getItem("Emp_Code"));
navigator.geolocation.getCurrentPosition(function(position) {
    updatePosition(position);
    setInterval(function(){
        var lat = currPosition.coords.latitude;
        var lng = currPosition.coords.longitude;
        alert.log(lat+' '+lng);
if(localStorage.getItem("Role") != 'ADMINISTRATOR'){

  if(localStorage.getItem("Emp_Code") != null){
    $.ajax({
            type: "POST", 
            url:  server+"locationSave.php", 
            data: 'x='+lat+'&y='+lng+'&Empcode='+localStorage.getItem("Emp_Code")+'&Role='+localStorage.getItem("Role"), 
            cache: false,
            success: function(str){
              alert.log(str);
            }
        });
  }

}
        
    }, 15000);
}, errorCallback); 

var watchID = navigator.geolocation.watchPosition(function(position) {
    updatePosition(position);
});

function updatePosition( position ){
    currPosition = position;
}

function errorCallback(error) {
  alert(error);  
}
$(function(){
	//server = "http://localhost:2800/ambica/";
  server = "http://ambicamobile.laksanasoft.com/mobile/";
	connect();
//alert(localStorage.getItem("Emp_Code")+' '+localStorage.getItem("Role"));
$("#srleft").load(server+"srsidebar.php");
$("#dbleft").load(server+"dbsidebar.php");
$("#soleft").load(server+"sosidebar.php");
$("#asoleft").load(server+"asosidebar.php");
$("#adminleft").load(server+"adminsidebar.php");
if(localStorage.getItem("Role") == 'SR'){
    $("#uname").html(localStorage.getItem("User_Name"));  
}
if(localStorage.getItem("Role") == 'SO'){
   $("#uname").html(localStorage.getItem("User_Name"));  
}
if(localStorage.getItem("Role") == 'ASO'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
if(localStorage.getItem("Role") == 'Distributor'){
    $("#uname").html(localStorage.getItem("User_Name"));
}
if(localStorage.getItem("Role") == 'ADMINISTRATOR'){
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
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Empcode);
        localStorage.setItem("User_Name",str.Username);
        location.href="Screen_SO.html";
         }

        if(str.Role == 'ASO'){
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Empcode);
        localStorage.setItem("User_Name",str.Username);
        location.href="Screen_ASO.html";
         }

         if(str.Role == 'ADMINISTRATOR'){
        localStorage.setItem("Role",str.Role);
        localStorage.setItem("User",str.Roll_Id);
        localStorage.setItem("Emp_Code",str.Empcode);
        localStorage.setItem("User_Name",str.Username);
        location.href="Screen_Admin.html";
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

function showOrder(oid){
localStorage.setItem("Order",oid);
location.href="Order.html"; 
}