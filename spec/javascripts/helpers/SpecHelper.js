beforeEach(function() {
  this.addMatchers(
	 {
		toBeA: function(expectedClass)
		{
		   return this.actual instanceof expectedClass;
		}
     }
  );
});

function waitsForAjax()
{
   waitsFor(function(){ return Ajax.activeRequestCount <= 0; },
			"Ajax request never completed", 1000);
}

function addContentDiv()
{
   $$('body')[0].insert({bottom: new Element('div', {id: 'content'})});
}

function removeContentDiv()
{
   $('content').remove();
}

Element.addMethods({
  click: function(el)
  {
	 var pos = el.cumulativeOffset();
	 var dim = el.getDimensions();
	 var ev = document.createEvent("MouseEvents");
     ev.initMouseEvent("click", true, true, window, 1,
		pos.left, pos.top, dim.width / 2, dim.height / 2,
        false, false, false, false, 0, null);

    el.dispatchEvent(ev);
  }
});