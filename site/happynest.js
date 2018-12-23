var currentContent= 'welcome';
var currentLanguage= 'en';

function setDefaults() {
    var hash= window.location.hash;
    
    if (hash.substr(0, 1) != '#') {
        currentContent= 'welcome';
        currentLanguage= 'en';
    } else {
        var elements= hash.substr(1).split(',');
        
        if (elements.length > 1) {
            currentLanguage= elements[1];
        } else {
            currentLanguage= 'en';
        }
        
        if (elements[0].length > 0) {
            currentContent= elements[0];
        }
    }
}

setDefaults();

(function (d, s, id) {
    const sdk= {
        de: 'de_DE',
        en: 'en_GB'
    }
    
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/' + sdk[currentLanguage] +'/sdk.js#xfbml=1&version=v2.11';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


(function() {

    const pageContents = {
        welcome: 'welcome.html',
        opening: 'opening_times.html',
        playgroup: 'playgroup.html',
        english: 'english_club.html',
        englishBeginner: 'english_beginner.html',
        music: 'music.html',
        location: 'location.html',
        fees: 'fees.html',
        conditions: 'conditions.html',
        staff: 'staff.html',
        contact: 'contact.html',
        registerEC: 'register_ec.html'
    }
    
    const pageTitles = {
        en: {
            welcome: {title: 'Welcome', longTitle: 'Welcome to The Happy Nest!'},
            opening: {title: 'Opening Times and Holidays'},
            playgroup: {title: 'Playgroup'},
            english: {title: 'English Club'},
            englishBeginner:  {title: "Beginners English", longTitle: "Beginners English - Free Spaces"},
            music: {title: 'Happy Music'},
            location: {title: 'Location'},
            fees: {title: 'Fees'},
            conditions: {title: 'Terms & Conditions'},
            staff: {title: 'Staff'},
            contact: {title: 'Contact Us'},
            registerEC: {title: 'Register', longTitle: 'Register Online'}
        },
        
        de: {
            welcome: {title: 'Willkommen', longTitle: 'Willkommen bei The Happy Nest!'},
            opening: {title: 'Öffnungszeiten und Ferien'},
            playgroup: {title: 'Curriculum'},
            location: {title: 'Standort'},
            fees: {title: 'Gebühren'},
            conditions: {title: 'Konditionen'},
            staff: {title: 'Personal'},
            contact: {title: 'Kontakt'},
        }
    };
    
    // some pages should not show up in the navigation
    Object.defineProperty(pageTitles.en, 'englishBeginner', {enumerable: false});
    Object.defineProperty(pageTitles.en, 'registerEC', {enumerable: false});
    
    function currentPage() {
        return 'pages/' + currentLanguage + '/' + pageContents[currentContent];
    }
    
    function getContent() {
        $.get(currentPage())
        .done(function(data, textStatus, jqXHR){
            $('#page-title')
            .text(makeTitle(currentContent))
            ;
            
            $('#page-content')
            .empty()
            .html(data)
            ;
        })
        .fail(function(jqXHR, textStatus){
            console.log("failed getting page", textStatus);
        })
        ;
    }
    
    function makeTitle(page) {
        var pageDescriptor= pageTitles[currentLanguage][page];
        
        if (pageDescriptor.hasOwnProperty('longTitle')) {
            return pageDescriptor.longTitle;
        } else {
            return pageDescriptor.title;
        }
    }
    function makeLink(page) {
        return $('<a>')
               .attr('href', '#' + page + ',' + currentLanguage)
               .text(pageTitles[currentLanguage][page].title)
               ;
    }
    
    function locationHashChanged() {
        var oldLanguage= currentLanguage;
        
        setDefaults();
        $('#menubar').removeClass('visible');

        if (oldLanguage !== currentLanguage) {
            window.location.reload();
        } else {
            buildNavigation();
            getContent();
        }

    }
    
    function buildNavigation() {
        var $menuBar= $('#menubar');
        
        $menuBar.empty();
        
        for (page in pageTitles[currentLanguage]) {
            $menuBar.append(makeLink(page));
        }
        
        $("a.language").each(function(index, element){
            var $element= $(element);
            
            if (!pageTitles[element.dataset.language].hasOwnProperty(currentContent)) {
                $element.hide();
            } else {
                $element.show();
                if (element.dataset.language === currentLanguage) {
                    $element.addClass('active');
                } else {
                    $element.removeClass('active');
                }
                $element.attr('href', '#' + currentContent + ',' + element.dataset.language);
            }
            
        });
    }

    function menubarToggleHandler() {
        $('#menubar').toggleClass('visible');
    }
    
    function documentReadyHandler() {
        if ("onhashchange" in window) {
            window.onhashchange = locationHashChanged;
        }
        //TODO else?

        $('#menubar-toggle')
            .on('click', menubarToggleHandler)

        
        setDefaults();
        buildNavigation();
        getContent();
    }
    
    $(documentReadyHandler);
}());