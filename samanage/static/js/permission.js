$(document).ready(function()
{
	function user_permisson()
	{
		var userinfo= new Array();
		$.post("/user/permission/",
		function(data){
			userinfo=data.split(":");
			// alert(userinfo[0]);
			// alert(userinfo[1]);
			if (userinfo[0] == "no" || userinfo[1] == "no") {
				location.href = "/"
			}
			var grouphtml = userinfo[0];
			var userhtml = userinfo[1];
			$('.usergroup').append(grouphtml);
			$('.username').append(userhtml);
		});
	}

	user_permisson();
});