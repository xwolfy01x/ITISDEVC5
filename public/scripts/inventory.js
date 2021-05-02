$(document).ready(function() {
	displayanddata();
	
	// $('option').each(function() {
	// 	if($(this).text().length > 15){
	// 		var optionText = $(this).text().substring(0, 14);
	// 		$(this).text(optionText + '...');
	// 	}
	// });
	$('#minus').click(function(){
		var oldqty = parseInt($('#productQuantity').val());
		if(oldqty > 1){
			$('#productQuantity').val(oldqty-1);
			displaytotalprice();
		}
	});
	
	$('#plus').click(function(){
		var oldqty = parseInt($('#productQuantity').val());
		$('#productQuantity').val(oldqty+1);
		displaytotalprice();
	});
	
	$('select').on('change', function() {
		displayanddata();

		$('#productSelect').attr('size', '1');
		$(this).blur();
	});

	$('select').on('focus', function() {
		$('#productSelect').attr('size', '5');
	});

	$('select').on('blur', function() {
		$('#productSelect').attr('size', '1');
	});

	$("#productQuantity").change(function(){
		displaytotalprice();
	});
});

function displaytotalprice(){
	var qty = parseInt($('#productQuantity').val());
	var temp = $('#productPrice').text().substring(4, $('#productPrice').text().length);
	var price = parseFloat(temp);
	var totalprice = price * qty;
	$('#totalPrice').text('Php ' + totalprice.toFixed(2));
}

function displayanddata(){
	var product = $('select').val();
		$('#productImage').attr('src', `/images/${product}.png`);
		var price = parseFloat($('select').find(':selected').data('price'));
		$('#productPrice').text('Php ' + price.toFixed(2));
		displaytotalprice();
		var oldquantity = $('select').find(':selected').data('oldqty');
		$('#oldquantity').attr('value', oldquantity);
		var purchaseid = $('select').find(':selected').data('purchaseid');
		$('#purchaseid').attr('value', purchaseid);
}