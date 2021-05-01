
$(document).ready(function() {
    var properties = [
        'name',
        'status',
        'quantity',
        'price'
    ];
    $.each( properties, function( i, val ) {
	
        var orderClass = '';
    
        $("#" + val).click(function(e){
            e.preventDefault();
            $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
              $(this).toggleClass('filter__link--active');
               $('.filter__link').removeClass('asc desc');
    
               if(orderClass == 'desc' || orderClass == '') {
                    $(this).addClass('asc');
                    orderClass = 'asc';
               } else {
                   $(this).addClass('desc');
                   orderClass = 'desc';
               }
    
            var parent = $(this).closest('.header__item');
            var index = $(".header__item").index(parent);
            var $table = $('.table-content');
            var rows = $table.find('.table-row').get();
            var isSelected = $(this).hasClass('filter__link--active');
            var isNumber = $(this).hasClass('filter__link--number');
                
            rows.sort(function(a, b){
    
                var x = $(a).find('.table-data').eq(index).text();
                    var y = $(b).find('.table-data').eq(index).text();
                    
                if(isNumber == true) {
                            
                    if(isSelected) {
                        return x - y;
                    } else {
                        return y - x;
                    }
    
                } else {
                
                    if(isSelected) {		
                        if(x < y) return -1;
                        if(x > y) return 1;
                        return 0;
                    } else {
                        if(x > y) return -1;
                        if(x < y) return 1;
                        return 0;
                    }
                }
                });
    
            $.each(rows, function(index,row) {
                $table.append(row);
            });
    
            return false;
        });
    
    });
    $('.edit').click(function(e) {
        document.getElementById('editPrice').style.display="flex";
        document.getElementById('editPrice').style.justifyItems="center";
        document.getElementsByClassName("container")[0].style.opacity="0.3";
        document.getElementsByClassName("links")[0].style.opacity="0.3";
        console.log(`/images/${document.getElementById('pName').innerText}.png`);
        
        $('#pName').text($(this).parent().prev().prev().prev().prev().children()[0].innerText);
        $('#close').parent().next().children()[0].src=`/images/${document.getElementById('pName').innerText}.png`
        $('#pID').val($(this).parent().prev().prev().prev().prev().children()[1].value);
        document.getElementById('pPrice').value=$(this).parent().prev().children()[0].innerText;
    });
    $('#close').click(function(e) {
        document.getElementById('editPrice').style.display="none";
        document.getElementsByClassName("container")[0].style.opacity="1";
        document.getElementsByClassName("links")[0].style.opacity="1";
    })
    $('#submit').click(function(e) {
        if ($(this).parent().prev().prev().children()[1].value=="")
            alert('New Price must not be empty!')
        else if (parseFloat($(this).parent().prev().prev().children()[1].value) <= 0)
            alert('Price must be valid!')
        else $('#editForm').submit();
    })
})
