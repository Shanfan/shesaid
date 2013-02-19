(function($) {    
    $(".controller .icon-shuffle").click(function(e){
        e.preventDefault();
        if ($(this).hasClass("active")) {
            appControl.order();
            $(this).toggleClass("active");
        } else {
            appControl.shuffle();
            $(this).toggleClass("active");
        }
    });
    
    $(".controller .pause-play").click(function(e){
        e.preventDefault();
        
        if ($(this).hasClass("icon-pause")){
            $(this).removeClass("icon-pause").addClass("icon-play");
            appControl.pause();
        } else {
            $(this).removeClass("icon-play").addClass("icon-pause");
            appControl.autoplay;
        };
    });
    
    $(".filters a").click(function(e){
        e.preventDefault();
        $(this).toggleFilter();
    });
    
    $(".metadata a").click(function(e){
        e.preventDefault();
        var filter = $(this).text();
        var cat = ".filters a." + $(this).attr("class");
        
        $(cat).each(function(){
            if ($(this).text() === filter) {
                $(this).toggleFilter();
            }
        });
    });


$.get('js/data/quotes.json', function(data){
    var quotes = [];
    var characters = [
        "Carrie Bradshaw",
        "Charlotte York",
        "Miranda Hobbes",
        "Samantha Jones"
    ];
    $.each(data, function(key, val){
        var character = characters[parseInt(val.by)-1];
        var season = "Season "+ val.in;
        var quote = val.line;
        quotes.push([character, season, quote]);
    });
});

//-----Utility Functions ---------

var appControl = {
    init : function(){
        this.autoplay();
        this.shuffle();
    },
    autoplay : function(){
        //start autoplay
    },
    
    prev : function(){
                    //show previous quote
                },
    
    next : function(){
                    //show next quote
                },

    pause : function(){
        //pause autoplay
    },
    
    shuffle : function() {
        //play the quotes randomly
    },
    
    order : function() {
        //play the quotes in order
    }
};

function toggleFilter(e){
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    filtering($(this).text());
};

function filtering(filter){
    //this function takes the input string as the "filter" argument, then filter and return the data that meets the qualification.
};




})(jQuery);