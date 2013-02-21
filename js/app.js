(function($) {
    
    //this will the init function later
    var quotes = allQuotes,
        quoteID = 0,
        timer = 5000,
        shuffle = false,
        autoplay;
    
    showQuote(quoteID);
    
    $(".controller .icon-shuffle").click(function(e){
        e.preventDefault();
        if ($(this).hasClass("active")) {
            shuffle = false;
            $(this).toggleClass("active");
        } else {
            shuffle = true;
            $(this).toggleClass("active");
        }
    });
    
    $(".controller .pause-play").click(function(e){
        e.preventDefault();
        
        if ($(this).hasClass("icon-pause")){
            $(this).removeClass("icon-pause").addClass("icon-play");
            window.clearInterval(autoplay);
        } else {
            $(this).removeClass("icon-play").addClass("icon-pause");            
            autoplay = window.setInterval(function(){
                showNext();
            }, timer);
        };
    });
    
    $(".controller .icon-next").click(function(e){
        e.preventDefault();
        showNext();
        if ($('.controller .pause-play').hasClass("icon-pause")){
            $('.controller .pause-play').trigger("click");
        }
    });
    
    $(".controller .icon-prev").click(function(e){
        e.preventDefault();
        showPrev();
        if ($('.controller .pause-play').hasClass("icon-pause")){
            $('.controller .pause-play').trigger("click");
        }
    });
  
    
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
    
    $(".filters a").click(toggleFilter);


function showQuote(n) {
        var quote = quotes[n].line;
        var chara = quotes[n].by;
        var season = "Season " + quotes[n].inSeason;
        var s = maxSize(quote);
        
        $(".app blockquote").queue(function(next){
            $(this).fadeOut(300, function(){
                $(".app blockquote").fitText(1.4, {
                    minFontSize: '18px',
                    maxFontSize: s
                });
                $(this).html(quote).fadeIn();
            });
            next();
        });
        $(".app .metadata .by").text(chara);
        $(".app .metadata .in").text(season);
}

function showNext() {
    if (!shuffle){
        quoteID < quotes.length-1 ? quoteID += 1 : quoteID = 0;
        showQuote(quoteID);
    } else {
        quoteID = Math.floor(Math.random() * quotes.length);
        showQuote(quoteID);
        console.log(quoteID);
    }

}

function showPrev() {
    if (!shuffle){
        quoteID == 0 ? quoteID = quotes.length-1 : quoteID -= 1;
        showQuote(quoteID);
    } else {
        quoteID = Math.floor(Math.random() * quotes.length);
        showQuote(quoteID);
        console.log(quoteID);
    }
}

function toggleFilter(e){
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    
    var name, season;
    
    if ($(this).hasClass("by")) {
        name = $(this).text();
        season = $(".filters .seasons .in.active").text().split(" ").pop();
    } else {
        season = $(this).text().split(" ").pop();
        name = $(".filters .characters .by.active").text();
    }
    
    quotes = filtering(name, season);
    quoteID = 0; //reset the id so the the diplay starts from the first of the filtered items.
    showQuote(quoteID);
    
    //stop autoplay
    if ($('.controller .pause-play').hasClass("icon-pause")){
        $('.controller .pause-play').trigger("click");
    }
};

function filtering(name, season){
    var filteredQuote = [];
    if (name == "Any Character") {
        if (season == "Season") {
            filteredQuote = allQuotes;
        } else {
            for (i in allQuotes) {
                if ( allQuotes[i].inSeason == parseInt(season) ){
                    filteredQuote.push(allQuotes[i]);
                }
            }
        }
    } else if (name != "Any Character") {
        if (season == "Season") {
            for (i in allQuotes) {
                if (allQuotes[i].by == name ) {
                    filteredQuote.push(allQuotes[i]);
                }
            }
        } else {
            for (i in allQuotes) {
                if (allQuotes[i].by == name && allQuotes[i].inSeason == parseInt(season)){
                    filteredQuote.push(allQuotes[i]);
                }
            }
        }
    }
    
    return filteredQuote; 
};


function  maxSize(quote){        
        if (quote.length > 250 ) {
            return '30px';
        }else if (quote.length < 40){
            return '51px';
        } else {
            return Math.floor( 55 - quote.length*.1) + "px";
        }
}

})(jQuery);
