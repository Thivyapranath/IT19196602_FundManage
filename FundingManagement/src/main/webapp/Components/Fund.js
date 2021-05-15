$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});



// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();



// Fund validation-------------------
var status = validateFundForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT";
 $.ajax(
 {
 url : "FundsAPI",
 type : type,
 data : $("#formFund").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
  location.reload(true);
 onFundSaveComplete(response.responseText, status);

 }
 }); 



// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidFundIDSave").val($(this).closest("tr").find('#hidFundIDUpdate').val());
 $("#name").val($(this).closest("tr").find('td:eq(0)').text());
 $("#address").val($(this).closest("tr").find('td:eq(1)').text());
 $("#phone").val($(this).closest("tr").find('td:eq(2)').text());
 $("#e_mail").val($(this).closest("tr").find('td:eq(3)').text());
 $("#description").val($(this).closest("tr").find('td:eq(4)').text());
});

$(document).on("click", ".btnRemove", function(event)
{
 $.ajax(
 {
 url : "FundsAPI",
 type : "DELETE",
 data : "fund_id=" + $(this).data("FundID"),
 dataType : "text",
 complete : function(response, status)
 {

  location.reload(true);
 onFundDeleteComplete(response.responseText, status);

 }
 });
});



// CLIENT-MODEL================================================================
function validateFundForm()
{
// Name
if ($("#name").val().trim() == "")
 {
 return "Insert name.";
 }
 
// Address
if ($("#address").val().trim() == "")
 {
 return "Insert address.";
 } 
 
 //Phone
 if ($("#phone").val().trim() == "")
 {
 return "Insert phone.";
 }
 
//Email
if ($("#e_mail").val().trim() == "")
 {
 return "Insert e-mail.";
 } 
 
//Description
if ($("#description").val().trim() == "")
 {
 return "Insert descritpion.";
 } 
  




return true;
}



function onFundSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divFundsGrid").html(resultSet.data);

 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 } 

 $("#hidFundIDSave").val("");
 $("#formFund")[0].reset();
}

function onFundDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divFundsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}


