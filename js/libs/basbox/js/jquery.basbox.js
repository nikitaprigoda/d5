(function( $ ){
  $.basbox = {
    init : function( options ) { 
      // А ВОТ ЭТОТ
    },
    show : function(th,settings,selector) {
		$(selector).each(function(){
			$($(this).attr('href')).addClass('popup-basbox');	
		});
		
		      
		if(settings['width']){
			$('.popup-basbox').css({'width':settings['width'],'margin-left':'-'+settings['width']});
		}	 
		setTimeout(function(){			
			$($(th).attr('href')).addClass('popup-basbox-active');
			$('html').append('<div class="popup-basbox-overlay"></div>').append('<div class="popup-basbox-close">x</div>');
			$('.popup-basbox-close').css({'left':settings['width']}).fadeIn('slow');
		},100);
    },
    showLoad : function(elem,settings) {
		$(elem).addClass('popup-basbox');	 
		if(settings['width']){
			$('.popup-basbox').css({'width':settings['width'],'margin-left':'-'+settings['width']});
		}	 
		setTimeout(function(){			
			$(elem).addClass('popup-basbox-active');
			$('html').append('<div class="popup-basbox-overlay"></div>').append('<div class="popup-basbox-close">x</div>');
			$('.popup-basbox-close').css({'left':settings['width']}).fadeIn('slow');
		},100);
    },
    hide : function(settings) {
		settings = settings || 0;
		$('.popup-basbox').removeClass('popup-basbox-active');
		$('.popup-basbox-overlay,.popup-basbox-close').remove();
		if(settings['afterClose']){
			settings['afterClose']();	
		}	
    }
  };
  $.fn.basbox = function( options ) {  

    // Создаём настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
    var settings = $.extend( {
      'width'         : '300px'
    }, options);

	$('html').on('click','.popup-basbox-close',function(){
		$.basbox.hide(settings);	
	})
	
	var selector = this.init()['selector'];
	var th = this;
	
	$('html').on('click.basbox',selector,function(){
		$('.popup-basbox').removeClass('popup-basbox-active');
		$('.popup-basbox-overlay,.popup-basbox-close').remove();
		if($($(this).attr('href')).hasClass('popup-basbox-active')){
			$.basbox.hide(settings);		
		}else{
	
			$.basbox.show(this,settings,selector);
		}
		return false;
	});
	
	if(options.show){
		$.basbox.showLoad(options.show,settings);
	}
  };
})( jQuery );