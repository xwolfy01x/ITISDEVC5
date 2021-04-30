$('#productSelect > option').each(function() {
    var optionText = this.text;
    var newOption = optionText.substring(0, 20);
    $(this).text(newOption + '...');
  });