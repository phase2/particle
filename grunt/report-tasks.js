module.exports = function (grunt, options) {
  "use strict";
  
  var tempFile = ".temp-scsslint.json";
  
  grunt.registerTask('report', '', function() {
    grunt.task.run('scsslint:report_scss');
    grunt.task.run('reportConvert');
    //reportConvert();
  });

  //function reportConvert() {
  //  var dest = 'source/_patterns/00-atoms/10-internals/scss-lint.json';
  //  var outFile = tempFile;
  //  var oldJSON = grunt.file.readJSON(outFile);
  //  grunt.file.delete(outFile);
  //
  //  var newJSON = {
  //    "dateRan": new Date().toISOString(),
  //    "report": []
  //  };
  //
  //  for (var prop in oldJSON) {
  //    if (oldJSON.hasOwnProperty(prop)) {
  //      newJSON.report.push({
  //        "file": prop,
  //        "errors": oldJSON[prop]
  //      });
  //    }
  //  }
  //  grunt.file.write(dest, JSON.stringify(newJSON, null, '  '));
  //  grunt.log.writeln("QA Report Built in Pattern Lab");
  //}
  
  grunt.registerTask('reportConvert', 'Don\'t run this directly; it\'s for Grunt', function() {
    var dest = 'source/_patterns/00-atoms/10-internals/scss-lint.json';
    var outFile = tempFile;
    var oldJSON = grunt.file.readJSON(outFile);
    grunt.file.delete(outFile);
  
    var newJSON = {
      "dateRan": new Date().toISOString(),
      "report": []
    };
  
    for (var prop in oldJSON) {
      if (oldJSON.hasOwnProperty(prop)) {
        newJSON.report.push({
          "file": prop,
          "errors": oldJSON[prop]
        });
      }
    }
    grunt.file.write(dest, JSON.stringify(newJSON, null, '  '));
    grunt.log.writeln("QA Report Built in Pattern Lab");
  });
  
  grunt.registerTask('qa', '', function () {
    grunt.task.run('jsonlint');
    grunt.task.run('jshint');
    grunt.task.run('scsslint:scss');
    grunt.task.run('report');
  });
  
  return {
    scsslint__scss: {
      options: {
        format: 'JSON',
        out: tempFile
      },
      src: "<%= scsslint.scss.src %>"
    }
  };
};
