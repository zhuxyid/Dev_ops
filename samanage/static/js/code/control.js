$(document).ready(function() {
	$('#package').on('click', function() {
		var project_name = $("#rel_app").val();
		var branch = $("#branch").val();
		if (branch=='')
		{
			$("#branch").css({ background: "rgb(250, 255, 189)" });
			return false;
		}
		var $btn = $(this).attr('disabled', true);
		$('#flush').attr({class:"fa fa-refresh fa-spin"});

        $.post("/code/package/", { project_name: project_name, branch:branch},
        function (data) {
			if (data == "nologin") {
				location.href = "/";
				return false;
			}
			if (data == "success") {
				alert("打包成功");
				window.location.reload();
				return false;
			}
			else{
				alert(data);
				$('#flush').attr({class:""});
				$btn.attr('disabled', false)
			}

        });
	});

	$('#project_packages').on('click', ".dev", function() {
		var $btn = $(this).attr('disabled', true);
		// $('#devflush').attr({class:"fa fa-refresh fa-spin"});
		$(this).find('#devflush').attr({class:"fa fa-refresh fa-spin"});
		var project_name = ($(this).parent().parent().find(".project_name").text());
		var version = ($(this).parent().parent().find(".version").text());
		$.post("/code/relaction/", { project_name: project_name, version: version, env: "dev", key: "sanqimei"},
		function (data) {
			if (data == "nologin") {
				location.href = "/";
				return false;
			}
			if (data == "success") {
				alert("发布成功");
				$btn.find('#devflush').attr({class:""});
				$btn.attr('disabled', false)
				return false;
			}
			else{
				alert(data);
				$btn.find('#devflush').attr({class:""});
				$btn.attr('disabled', false)
				return false;
			}
        });
	});

	$('#project_packages').on('click', ".test", function() {
		var $btn = $(this).attr('disabled', true);
		$(this).find('#testflush').attr({class:"fa fa-refresh fa-spin"});
		var project_name = ($(this).parent().parent().find(".project_name").text());
		var version = ($(this).parent().parent().find(".version").text());
		$.post("/code/relaction/", { project_name: project_name, version: version, env: "test", key: "sanqimei"},
		function (data) {
			if (data == "nologin") {
				location.href = "/";
				return false;
			}
			if (data == "success") {
				alert("发布成功");
				$btn.find('#testflush').attr({class:""});
				$btn.attr('disabled', false)
				return false;
			}
			else{
				alert(data);
				$btn.find('#testflush').attr({class:""});
				$btn.attr('disabled', false)
			}
        });
	});

	$('#project_packages').on('click', ".gray", function() {
		var $btn = $(this).attr('disabled', true);
		$(this).find('#grayflush').attr({class:"fa fa-refresh fa-spin"});
		var project_name = ($(this).parent().parent().find(".project_name").text());
		var version = ($(this).parent().parent().find(".version").text());
		$.post("/code/relaction/", { project_name: project_name, version: version, env: "gray", key: "sanqimei"},
		function (data) {
			if (data == "nologin") {
				location.href = "/";
				return false;
			}
			if (data == "success") {
				alert("发布成功");
				$btn.find('#testflush').attr({class:""});
				$btn.attr('disabled', false)
				return false;
			}
			else{
				alert(data);
				$btn.find('#testflush').attr({class:""});
				$btn.attr('disabled', false)
			}
        });
	});

	$('#project_packages').on('click', ".online", function() {
		var $btn = $(this).attr('disabled', true);
		$(this).find('#onlineflush').attr({class:"fa fa-refresh fa-spin"});
		var project_name = ($(this).parent().parent().find(".project_name").text());
		var version = ($(this).parent().parent().find(".version").text());
		$.post("/code/relaction/", { project_name: project_name, version: version, env: "online", key: "sanqimei"},
		function (data) {
			if (data == "nologin") {
				location.href = "/";
				return false;
			}
			if (data == "success") {
				alert("发布成功");
				$btn.find('#onlineflush').attr({class:""});
				$btn.attr('disabled', false)
				return false;
			}
			else{
				alert(data);
				$btn.find('#onlineflush').attr({class:""});
				$btn.attr('disabled', false)
			}
        });
	});

});
