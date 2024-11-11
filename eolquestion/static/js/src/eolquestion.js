/* Javascript for EolQuestionXBlock. */
function EolQuestionXBlock(runtime, element, settings) {

    function renderMathForSpecificElements(id) {
        if (typeof MathJax !== "undefined") {
            var $questiontext = $('#' + id);
            if ($questiontext.length) {
                $questiontext.find('.text').each(function (index, questextelem) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, questextelem]);
                });
            }
        } else {
            console.warn("MathJax no está cargado.");
        }
    }

    $(function ($) {
        /* Here's where you'd do things on page load. */
        //MathJax.Hub.Queue(["Typeset", MathJax.Hub]); //Reconstruir latex

        var questiontextid = "questionstatement_" + settings.sublocation;
        renderMathForSpecificElements(questiontextid);
    });
}

