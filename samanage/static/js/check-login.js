$(document).ready(function()
{
$("#login-submit").click(function(event){
	var username = $.trim($("#login-username").val());
	var password = $.trim($("#login-password").val());
    var ret = false;
	if(username=='')
	{
		$("#login-username").css({ background: "rgb(250, 255, 189)" });
		return false;
	}
	if(password=='')
	{
		$("#login-password").css({ background: "rgb(250, 255, 189)" });
		return false;
	}
	$.post("/user/auth/", { username: username, password: password},
		function(data){
		if(data=='1')
		{
			location.href = "/dashboard";
			ret = true;
		}
		else
		{
		$("#login-password").css({ "border-color": "#a94442" });
		ret = false;
		}
	});
	return ret;
}); 
});