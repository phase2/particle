casper.thenOpen('pattern-lab/public/patterns/00-atoms-06-forms/index.html')
    .then(function () {
        var patterns;

        this.viewport(600, 1000);

        patterns = this.evaluate(function() {
            var ids = [];
            var elements;

            elements = document.getElementsByClassName('sg-pattern');
            for (var i = 0; i < elements.length; i++) {
              ids.push(elements[i].id);
            }

            return ids;
        });


        function takeScreenshot(value, index) {
          var id;
          id = value.id;

          phantomcss.screenshot('#' + value + ' .sg-pattern-body', value);
        }

        patterns.forEach(takeScreenshot);
    });
