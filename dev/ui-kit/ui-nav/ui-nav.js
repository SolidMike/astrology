var $dropdown = $(".dropdown");
var $dropdownToggle = $(".dropdown-toggle");
var $dropdownMenu = $(".dropdown-menu");
var showClass = "show";
$dropdownToggle.on('click', function () {
    var $this = $(this);

    if ($this.parent().hasClass('show')) {
        if ($this.length && $this.attr('href')) {
            location.href = $this.attr('href');
        }
    } else {}
});
$(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
        $dropdown.hover(function () {
            var $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "true");
            $this.find($dropdownMenu).addClass(showClass);
        }, function () {
            var $this = $(this);
            $this.removeClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "false");
            $this.find($dropdownMenu).removeClass(showClass);
        });
    } else {
        $dropdown.off("mouseenter mouseleave");
    }
});

//or

const menu = $('.menu')
const menuLink = menu.find('a')

menuLink.on('click', function(event){
    event.preventDefault()
    if ($(this).parent().hasClass('active') && $(this).parent().children('.submenu').length > 0) {
        if ($(this).length && $(this).attr('href')) {
            location.href = $(this).attr('href');
        }
    } else {}
    $(this).closest('li').toggleClass('active')
})
