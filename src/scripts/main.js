// Initialize carousels
$('.carousel').carousel();

// Affect label on input focus
$('.contact form .form-control').on('focus', function () {
    $(this).siblings('label').addClass('focused');
});

$('.contact form .form-control').on('blur', function () {
    if (!$(this)) {
        $(this).siblings('label').removeClass('focused');
    }
});