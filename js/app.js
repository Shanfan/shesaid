(function($) {
    
    //this will the init function later
    var quoteID = 0;
    
    
    $(".controller .icon-shuffle").click(function(e){
        e.preventDefault();
        if ($(this).hasClass("active")) {
            appControl.shuffle = false;
            $(this).toggleClass("active");
        } else {
            appControl.shuffle = true;
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
            appControl.autoplay();
        };
    });
    
    $(".controller .icon-next").click(function(e){
        e.preventDefault(); 
        if (quoteID < quotes.length-1) { quoteID += 1; } else { quoteID = 0; }
        showQuote(quoteID);
    });
    
    $(".controller .icon-prev").click(function(e){
        e.preventDefault();
        if (quoteID == 0 ) {quoteID = 17; } else { quoteID -= 1; }
        showQuote(quoteID);
    });
    
    
    
    
    
    $(".filters a").click(toggleFilter);
    
    $(".metadata a").click(function(e){
        e.preventDefault();
        var filter = $(this).text();
        var cat = ".filters a." + $(this).attr("class");
        
        $(cat).each(function(){
            if ($(this).text() === filter) {
                $(this).trigger('click');
            }
        });
    });



// appControl plugin

var appControl = {
    shuffle : true,
    
    init : function(){
        this.shuffle = true;
        this.autoplay();
    },
    
    autoplay : function(){
        this.shuffle ? randomPlay : orderedPlay;
    },
    
    prev : function(){
        //show previous quote
    },
    
    next : function(n){
        //show next quote

    },

    pause : function(){
        this.autoplay = null;
    },
        
    randomPlay : function(){

    },
    
    orderedPlay : function() {
        
    }

};

function showQuote(n) {
        var quote = quotes[n].line;
        var chara = quotes[n].by;
        var season = "Season" + quotes[n].inSeason;
        
        console.log("n = " + n +", chara = " + chara + ", season = " + season)
        
        $(".app .view blockquote").text(quote);
        $(".app .metadata .by").text(chara);
        $(".app .metadata .in").text(season);
}

function toggleFilter(e){
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    filtering($(this).text());
};

function filtering(filter){
    //this function takes the input string as the "filter" argument, then filter and return the data that meets the qualification.
};




})(jQuery);