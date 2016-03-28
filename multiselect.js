 "use strict";
(function($) {
    jQuery.fn.extend({
        multiselect: function(options) {
	        /*Settings list and the default values
	         * 	- selected	: array of id in string, for setting the selected on init dropdown
	         * 	- onClick 	: event rest for on list item click
	         *  - init 		: init function
	         */
	        var defaults = {
	        	selected: [],
	            onClick : function () { },
	            init : function() {}
	        };
	
	        var options = jQuery.extend(defaults, options);
	        var list = this;
	        var allLi = jQuery('li', this);
	        var id_li_exist;
	        var checkbox_li_exist;
	        
	        options.init();
	        
	        addCheckbox(allLi);
	        setEventOnClick(allLi);
	        
	        var tempList = list.clone();
	        initSelected(options.selected,list);
	        
	        
	        function initSelected(array_id_selecting) {
	        	jQuery(array_id_selecting).each(function (index) {
	        		var t_selecting = jQuery('#'+this,list);
	                moveTop(t_selecting,list);
	        	});
	        }
	        
	        function addCheckbox(allLi) {
	            allLi.each(function(index) {
	                checkbox_li_exist = jQuery('input:checkbox', this);
	                if(!checkbox_li_exist) {
	                    var addCheckbox = "<input type='checkbox' style='display:none' name='checkbox_"+ index +"' />";
	                    li.append(addCheckbox);
	                }
	            });
	        }
	        
	        function setEventOnClick(allLi) {
	            allLi.each(function(index) {
	                var li = jQuery(this);
	                li.click(function(e) {
	                    onClick(this);
	                });
	            });
	        }
	
	        function onClick(element) {
	            var t_selecting = element;
	            var selectingCheckbox = jQuery('input:checkbox', t_selecting);
	            if (selectingCheckbox.is(':checked')) {
	                reset(t_selecting);
	                options.onClick();
	                return;
	            }
	            moveTop(t_selecting,list);
	            if(options.onClick) {
	                options.onClick();
	            }
	        };
	        
	        function moveTop(t_selecting, t_list) {
	            var selectingCheckbox = jQuery('input:checkbox', t_selecting);
	            //clone obj to move
	            var tempLi = jQuery(t_selecting).clone(true,true);
	            //remove selecting li from list
	            jQuery(t_selecting).remove();
	            //re-assign clone obj
	            t_selecting = tempLi;
	            //move obj to top
	            jQuery('ul',t_list).prepend(tempLi);
	            // Check hidden checkbox and set to bold
	            selectingCheckbox = jQuery('input:checkbox', tempLi);
	            selectingCheckbox.prop('checked', !selectingCheckbox.prop('checked'));
	            jQuery('a', t_selecting).css('font-weight', 'bold');
	        }
	
	        function reset(t_selecting) {
	           var  temp =  jQuery(tempList).clone();
	           list.empty();
	           var lis = jQuery('li', temp);
	           setEventOnClick(lis);
	           temp.replaceAll(list);
	           list = temp;
	           var ta_selecting;
	           lis.each(function(index) {
	               if(jQuery(this).attr('id') == jQuery(t_selecting).attr('id')) {
	                   ta_selecting = this;
	               }
	           });
	           moveTop(ta_selecting,temp);
	        };
        }
    });
})(jQuery);
