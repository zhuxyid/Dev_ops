$(document).ready(function()
{
	function getproject()
	{
		$.post("/code/getproject/",
		function(data){
			$("#rel_app").empty();
			$('#rel_app').append('<option value="choose">请选择</option>');
			$('#rel_app').append('<optgroup label="Front/前端项目" id="front">');
			$('#rel_app').append('<optgroup label="Java/后端项目" id="java">');
			for(var i=0;i<data.length;i++)
			{
			    if(data[i][2]=="front")
                {
                    $('#front').append('<option value="' + data[i][0] + '">' + data[i][0] + '--' + data[i][1] + '</option>');
                }
                if(data[i][2]=="java")
                {
                    $('#java').append('<option value="' + data[i][0] + '">' + data[i][0] + '--' + data[i][1] + '</option>');
                }
			};
		});
	}
	getproject();
});