function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,          
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}

function load(path) {
    return $.ajax({
                url: path,
                dataType: 'html',
                async: false,          
                success: function () {
                    // all good...
                }
    }).responseText;
}

var templateCache = {};

function loadTemplate(path){
    var template;
    var cached = templateCache[path];
    if(cached){
        template = cached;
    }else{
        var source = load(path);
        template = Handlebars.compile(source);
        templateCache[path] = template;
    }
    
    return template;
}