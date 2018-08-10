	function getPackages(val)
	{
		var project_name = $('#rel_app option:selected') .val();
		$.post("/code/packages/", { project_name: project_name},
		function(data){
			$('#project_packages').empty();
			for(var i=0;i<data.length;i++){
			    if (data[i][4] == null)
                {
                    location.href = "/";
                    return false;
                }
			    if (data[i][4] == "java" || data[i][4] == "front")
                {
                    var button_html = '<button id="dev" type="button" class="dev btn btn-info" data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">开发环境<i id="devflush"></i></button>'
                }
                if (data[i][4] == "qa")
                {
                    var button_html = '<button id="test" type="button" class="test btn btn-info"  data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">测试环境<i id="testflush"></i></button>'
                                    + '<button id="gray" type="button" class="gray btn btn-info"  data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">灰度环境<i id="grayflush"></i></button>'
                }
                if (data[i][4] == "om")
                {
                    var button_html = '<button id="online" type="button" class="online btn btn-danger"  data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">正式环境<i id="onlineflush"></i></button>'
									+ '<button id="gray" type="button" class="gray btn btn-info"  data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">灰度环境<i id="grayflush"></i></button>'
									+ '<button id="test" type="button" class="test btn btn-info"  data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">测试环境<i id="testflush"></i></button>'
									+ '<button id="dev" type="button" class="dev btn btn-info" data-loading-text="running..." autocomplete="off" style="margin-right: 10px;">开发环境<i id="devflush"></i></button>'
                }
			    var list_html = '<tr id="' + data[i][2] + '">'
			    		 + '<td class="project_name om_table_td" id="project_name" value="' + project_name + '">' + project_name + '</td>'
			    		 + '<td class="version om_table_td" id="version" value="' + data[i][0] + '">' + data[i][0] + '</td>'
			    		 + '<td class="time om_table_td" id="time" value="' + data[i][1] + '">' + data[i][1] + '</td>'
			    		 + '<td class="time om_table_td" id="branch" value="' + data[i][3] + '">' + data[i][3] + '</td>'
			    		 + '<td class="om_table_td">'
			    		 + button_html
			    		 + '</td>'
			    		 + '</tr>';
			    $('#project_packages').append(list_html);
			};

		},'json');

	}
