$(function() {
    const $window = $(window);
    const $navbar = $('header .menu');
    const $menuIcon = $('#menu');
    const $arrowUp = $('#arrow-up');
    const $reload = $('#logo');
    const $p_progressBar = $('.skill .container'); // Parent of Progress Bars
    
    $reload.on('click', function(event) {
        event.preventDefault();
        location.reload();
    });

    // menu - xmark switching on click
    $menuIcon.on('click', function() {
        $(this).toggleClass('active');
        $(this).toggleClass('fa-xmark');
        $navbar.toggleClass('active');
    });

    // condition for menu - xmark if screen size <= 768
    $('header nav a').on('click', function() {
        if ($window.width() <= 768) {
            $navbar.removeClass('active');
            $menuIcon.toggleClass('active');
            $menuIcon.toggleClass('fa-xmark');
        }
    });

    // window scroll configuration
    $window.on('scroll load', function() {
        const scrollPosition = $window.scrollTop();

        $arrowUp.toggleClass('active', scrollPosition > 200);

        let iterateCount = 0; // Initialize iteration counter
        // Check if section is 2/3 visible in viewport
        $('main section').each(function() {
            const sectionHeight = $(this).height();
            const sectionOffset = $(this).offset().top - 200;
            const sectionID = $(this).attr('id');
            const $container = $('.' + sectionID + ' .container');

            const sectIsInView = scrollPosition > sectionOffset && scrollPosition < sectionOffset + sectionHeight;

            // Triggers if iteration count is 2 (3rd index)
            if(iterateCount === 2) {
                if(sectIsInView) {
                    let children_div = $p_progressBar.filter(":has(div)").children("div");  // filters out div children

                    const numOfChildren = children_div.length;

                    for(let i = 1; i <= numOfChildren; i++) {
                        $('.progress .percent.item-' + i.toString()).addClass('active');
                    }
                }
            }
            // triggers if section is 2/3 visible
            $navbar.find('a[href="#' + sectionID + '"]').toggleClass('active', sectIsInView);

            if(sectIsInView) {
                $container.addClass('fadeIn');
                $container.css("opacity", "1");
            }
            
            iterateCount++; // increment iteration counter
        });
    });
});
