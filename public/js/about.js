$(document).ready(function () {
    initListeners();
    var imageUrl = "";
    var ambient = new Ambient();
    ambient.mount();

    function initListeners() {
        $(".slide-image").click(function (e) {
            e.preventDefault();
            setMainImage(this.children[0].src);
        })
    }

    function setMainImage(url) {
        $(".ambient__visible").attr("src", url);
        $(".ambient__shadow").attr("src", url);
        $(".main-slide-image").attr("src", url);
    }
})