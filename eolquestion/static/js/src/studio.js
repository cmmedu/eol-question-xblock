function EolQuestionStudioXBlock(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

    $(element).find('select[name=theme]').change(function () {
      var theme = $(this).val();
      var colorInput = $(element).find('input[name=color]');

      if (theme === "SumaySigue") {
        colorInput.val('#e71f24');
      } else if (theme === "Media") {
        colorInput.val('#612871');
      } else if (theme === "RedFid") {
        colorInput.val('#0C8AA8');
      } else if (theme === "Didactica") {
        colorInput.val('#e71f24');
      }
    });

    $(element).find('.save-button').bind('click', function (e) {
      var form_data = new FormData();
      var display_name = $(element).find('input[name=display_name]').val();
      var type = $(element).find('select[name=type]').val();
      var index = Math.floor( $(element).find('input[name=index]').val());
      var text = $(element).find('input[name=text]').val();
      text = text ? text : 'Enunciado no especificado';
      var theme = $(element).find('select[name=theme]').val();
      var color = $(element).find('input[name=color]').val();
      color = color ? color : '#e71f24';
      var idspecific = $(element).find('input[name=idspecific]').val();
      idspecific = idspecific ? idspecific : '0'
      form_data.append('display_name', display_name);
      form_data.append('type', type);
      form_data.append('index', index);
      form_data.append('text', text);
      form_data.append('theme', theme);
      form_data.append('color', color);
      form_data.append('idspecific', idspecific);
      
      if ($.isFunction(runtime.notify)) {
        runtime.notify('save', {state: 'start'});
      }
  
      $.ajax({
        url: handlerUrl,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: "POST",
        success: function(response){
          if ($.isFunction(runtime.notify)) {
            runtime.notify('save', {state: 'end'});
          }
        }
      });
      e.preventDefault();
  
    });
  
    $(element).find('.cancel-button').bind('click', function(e) {
      runtime.notify('cancel', {});
      e.preventDefault();
    });
  
  }
  